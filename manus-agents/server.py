#!/usr/bin/env python3
"""
Manus Agent Orchestrator - Render Web Service
Runs on Render.com, connects to Mac Studio via SSH tunnel
"""

import os
import json
import subprocess
import threading
import time
import logging
from datetime import datetime
from flask import Flask, request, jsonify
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration from environment variables
MAC_STUDIO_IP = os.getenv('MAC_STUDIO_IP', '192.168.1.9')
MAC_STUDIO_USER = os.getenv('MAC_STUDIO_USER', 'igorcunha')
MAC_SSH_KEY_PATH = os.getenv('MAC_SSH_KEY_PATH', '/etc/secrets/mac_ssh_key')
LLM_API_URL = os.getenv('LLM_API_URL', 'http://192.168.1.9:1234/v1')
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', '')

# Track running tasks
active_tasks = {}


###############################################################################
# TELEGRAM NOTIFICATIONS
###############################################################################

def send_telegram(message):
    """Send a message to Telegram"""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials not set, skipping notification")
        return False
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }
        response = requests.post(url, json=payload, timeout=10)
        return response.status_code == 200
    except Exception as e:
        logger.error(f"Telegram error: {e}")
        return False


###############################################################################
# SSH COMMAND EXECUTION ON MAC STUDIO
###############################################################################

def run_on_mac(command, timeout=300):
    """Execute a command on Mac Studio via SSH"""
    try:
        ssh_cmd = [
            'ssh',
            '-i', MAC_SSH_KEY_PATH,
            '-o', 'StrictHostKeyChecking=no',
            '-o', 'ConnectTimeout=30',
            f'{MAC_STUDIO_USER}@{MAC_STUDIO_IP}',
            command
        ]
        result = subprocess.run(
            ssh_cmd,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        return {
            'stdout': result.stdout,
            'stderr': result.stderr,
            'returncode': result.returncode,
            'success': result.returncode == 0
        }
    except subprocess.TimeoutExpired:
        return {'stdout': '', 'stderr': 'Command timed out', 'returncode': 1, 'success': False}
    except Exception as e:
        return {'stdout': '', 'stderr': str(e), 'returncode': 1, 'success': False}


###############################################################################
# AGENT: AUDITOR
###############################################################################

def run_auditor(task_id, target_path='~'):
    """Scan Mac Studio filesystem and generate audit report"""
    logger.info(f"[{task_id}] Auditor starting on path: {target_path}")
    active_tasks[task_id] = {'status': 'running', 'agent': 'auditor', 'started': datetime.now().isoformat()}

    try:
        # Get total size
        size_result = run_on_mac(f"du -sh {target_path} 2>/dev/null | awk '{{print $1}}'")
        total_size = size_result['stdout'].strip() if size_result['success'] else 'Unknown'

        # Get top directories
        dirs_result = run_on_mac(f"du -sh {target_path}/* 2>/dev/null | sort -rh | head -15")
        top_dirs = dirs_result['stdout'].strip() if dirs_result['success'] else 'Unable to retrieve'

        # Count files
        count_result = run_on_mac(f"find {target_path} -type f 2>/dev/null | wc -l")
        total_files = count_result['stdout'].strip() if count_result['success'] else 'Unknown'

        # Find large files
        large_result = run_on_mac(f"find {target_path} -type f -size +100M 2>/dev/null | head -20")
        large_files = large_result['stdout'].strip() if large_result['success'] else 'None found'

        # Find archive files
        archive_result = run_on_mac(
            f"find {target_path} -type f \\( -name '*.zip' -o -name '*.tar.gz' -o -name '*.rar' \\) 2>/dev/null | head -20"
        )
        archives = archive_result['stdout'].strip() if archive_result['success'] else 'None found'

        # Find duplicate candidates (same size)
        dup_result = run_on_mac(
            f"find {target_path} -type f -size +1M 2>/dev/null | xargs ls -la 2>/dev/null | awk '{{print $5, $9}}' | sort | uniq -d -w 10 | head -20"
        )
        duplicates = dup_result['stdout'].strip() if dup_result['success'] else 'None found'

        report = {
            'task_id': task_id,
            'timestamp': datetime.now().isoformat(),
            'target_path': target_path,
            'total_size': total_size,
            'total_files': total_files,
            'top_directories': top_dirs,
            'large_files': large_files,
            'archive_files': archives,
            'duplicate_candidates': duplicates,
            'status': 'completed'
        }

        active_tasks[task_id] = {
            'status': 'completed',
            'agent': 'auditor',
            'report': report,
            'completed': datetime.now().isoformat()
        }

        # Send Telegram notification
        message = f"""
📊 *File Audit Complete*
`{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`

📁 *Total Files:* {total_files}
💾 *Total Size:* {total_size}

*Top Directories:*
```
{top_dirs[:500] if top_dirs else 'N/A'}
```

*Large Files (>100MB):*
```
{large_files[:300] if large_files else 'None'}
```

*Archive Files:*
```
{archives[:300] if archives else 'None'}
```

Audit complete. Ready for next step.
        """
        send_telegram(message)
        logger.info(f"[{task_id}] Auditor completed successfully")
        return report

    except Exception as e:
        logger.error(f"[{task_id}] Auditor error: {e}")
        active_tasks[task_id] = {'status': 'error', 'agent': 'auditor', 'error': str(e)}
        send_telegram(f"❌ *Auditor Error*\n`{str(e)}`")
        return None


###############################################################################
# AGENT: ORGANIZER
###############################################################################

def run_organizer(task_id, dry_run=True):
    """Create new folder structure on Mac Studio"""
    logger.info(f"[{task_id}] Organizer starting (dry_run={dry_run})")
    active_tasks[task_id] = {'status': 'running', 'agent': 'organizer', 'started': datetime.now().isoformat()}

    try:
        # Create new folder structure
        folders = [
            '~/_ACTIVE/automation',
            '~/_ACTIVE/data-ops',
            '~/_ACTIVE/publishing',
            '~/_ACTIVE/legal-data',
            '~/_ACTIVE/election-data',
            '~/_ACTIVE/social-intelligence',
            '~/_ARCHIVE',
            '~/_SYSTEM/venvs',
            '~/_SYSTEM/docker-configs',
            '~/_SYSTEM/ssh-keys',
            '~/_SYSTEM/scripts',
            '~/_STORAGE',
            '~/_INBOX/downloads',
            '~/_INBOX/temp',
            '~/_DUPLICATES'
        ]

        results = []
        for folder in folders:
            if dry_run:
                results.append(f"[DRY RUN] Would create: {folder}")
            else:
                result = run_on_mac(f"mkdir -p {folder}")
                status = "✓" if result['success'] else "✗"
                results.append(f"{status} Created: {folder}")

        summary = '\n'.join(results)
        active_tasks[task_id] = {
            'status': 'completed',
            'agent': 'organizer',
            'summary': summary,
            'dry_run': dry_run,
            'completed': datetime.now().isoformat()
        }

        mode = "DRY RUN" if dry_run else "LIVE"
        message = f"""
📁 *Organizer Complete ({mode})*
`{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`

*Folders {'to create' if dry_run else 'created'}:*
```
{summary[:800]}
```

{'Run with dry_run=false to apply changes.' if dry_run else 'Folder structure created successfully!'}
        """
        send_telegram(message)
        logger.info(f"[{task_id}] Organizer completed")
        return summary

    except Exception as e:
        logger.error(f"[{task_id}] Organizer error: {e}")
        active_tasks[task_id] = {'status': 'error', 'agent': 'organizer', 'error': str(e)}
        return None


###############################################################################
# AGENT: CLEANER
###############################################################################

def run_cleaner(task_id, target_path='~/Downloads', dry_run=True):
    """Find and quarantine duplicate files"""
    logger.info(f"[{task_id}] Cleaner starting on: {target_path}")
    active_tasks[task_id] = {'status': 'running', 'agent': 'cleaner', 'started': datetime.now().isoformat()}

    try:
        # Find files older than 90 days in Downloads
        old_files_result = run_on_mac(
            f"find {target_path} -type f -mtime +90 2>/dev/null | head -30"
        )
        old_files = old_files_result['stdout'].strip() if old_files_result['success'] else ''

        # Find large zip files
        zip_result = run_on_mac(
            f"find {target_path} -name '*.zip' -size +50M 2>/dev/null | head -20"
        )
        large_zips = zip_result['stdout'].strip() if zip_result['success'] else ''

        summary = {
            'old_files_count': len(old_files.split('\n')) if old_files else 0,
            'old_files': old_files[:500],
            'large_zips': large_zips[:300],
            'dry_run': dry_run
        }

        active_tasks[task_id] = {
            'status': 'completed',
            'agent': 'cleaner',
            'summary': summary,
            'completed': datetime.now().isoformat()
        }

        mode = "DRY RUN" if dry_run else "LIVE"
        message = f"""
🧹 *Cleaner Complete ({mode})*
`{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`

*Files older than 90 days:* {summary['old_files_count']}
```
{summary['old_files'][:400] if summary['old_files'] else 'None found'}
```

*Large zip files:*
```
{summary['large_zips'][:300] if summary['large_zips'] else 'None found'}
```
        """
        send_telegram(message)
        logger.info(f"[{task_id}] Cleaner completed")
        return summary

    except Exception as e:
        logger.error(f"[{task_id}] Cleaner error: {e}")
        active_tasks[task_id] = {'status': 'error', 'agent': 'cleaner', 'error': str(e)}
        return None


###############################################################################
# API ROUTES
###############################################################################

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'service': 'Manus Agent Orchestrator',
        'status': 'online',
        'version': '1.0',
        'timestamp': datetime.now().isoformat(),
        'mac_studio': MAC_STUDIO_IP,
        'active_tasks': len(active_tasks)
    })


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})


@app.route('/run/audit', methods=['POST'])
def trigger_audit():
    """Trigger filesystem audit on Mac Studio"""
    data = request.json or {}
    task_id = f"audit_{int(time.time())}"
    target_path = data.get('target_path', '~')

    thread = threading.Thread(target=run_auditor, args=(task_id, target_path))
    thread.daemon = True
    thread.start()

    return jsonify({
        'task_id': task_id,
        'status': 'started',
        'agent': 'auditor',
        'target': target_path
    })


@app.route('/run/organize', methods=['POST'])
def trigger_organize():
    """Trigger folder structure creation on Mac Studio"""
    data = request.json or {}
    task_id = f"organize_{int(time.time())}"
    dry_run = data.get('dry_run', True)

    thread = threading.Thread(target=run_organizer, args=(task_id, dry_run))
    thread.daemon = True
    thread.start()

    return jsonify({
        'task_id': task_id,
        'status': 'started',
        'agent': 'organizer',
        'dry_run': dry_run
    })


@app.route('/run/clean', methods=['POST'])
def trigger_clean():
    """Trigger cleanup scan on Mac Studio"""
    data = request.json or {}
    task_id = f"clean_{int(time.time())}"
    target_path = data.get('target_path', '~/Downloads')
    dry_run = data.get('dry_run', True)

    thread = threading.Thread(target=run_cleaner, args=(task_id, target_path, dry_run))
    thread.daemon = True
    thread.start()

    return jsonify({
        'task_id': task_id,
        'status': 'started',
        'agent': 'cleaner',
        'target': target_path,
        'dry_run': dry_run
    })


@app.route('/run/command', methods=['POST'])
def run_command():
    """Run a raw command on Mac Studio"""
    data = request.json or {}
    command = data.get('command', '')

    if not command:
        return jsonify({'error': 'No command provided'}), 400

    result = run_on_mac(command)
    return jsonify(result)


@app.route('/tasks', methods=['GET'])
def list_tasks():
    """List all active/completed tasks"""
    return jsonify(active_tasks)


@app.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    """Get status of a specific task"""
    task = active_tasks.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task)


@app.route('/notify', methods=['POST'])
def notify():
    """Send a Telegram notification"""
    data = request.json or {}
    message = data.get('message', '')
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    success = send_telegram(message)
    return jsonify({'success': success})


@app.route('/mac/status', methods=['GET'])
def mac_status():
    """Check if Mac Studio is reachable"""
    result = run_on_mac("echo 'Mac Studio online' && uptime && hostname")
    return jsonify({
        'reachable': result['success'],
        'output': result['stdout'],
        'error': result['stderr']
    })


###############################################################################
# STARTUP
###############################################################################

if __name__ == '__main__':
    port = int(os.getenv('PORT', 10000))
    logger.info(f"Manus Agent Orchestrator starting on port {port}")
    logger.info(f"Mac Studio target: {MAC_STUDIO_USER}@{MAC_STUDIO_IP}")

    # Send startup notification
    send_telegram(
        f"🤖 *Manus Agent Orchestrator Online*\n"
        f"`{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`\n\n"
        f"Mac Studio: `{MAC_STUDIO_IP}`\n"
        f"Ready to receive tasks."
    )

    app.run(host='0.0.0.0', port=port, debug=False)
