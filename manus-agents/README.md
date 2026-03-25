# Manus Agent Orchestrator

A lightweight Python/Flask web service that runs on **Render.com** and connects to your **Mac Studio** via SSH to execute file organization tasks.

## Architecture

```
Render.com (Web Service)
├── Flask API (port 10000)
├── Auditor Agent → SSH → Mac Studio
├── Organizer Agent → SSH → Mac Studio
├── Cleaner Agent → SSH → Mac Studio
└── Telegram Notifications → Your Phone
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Service status |
| GET | `/health` | Health check |
| GET | `/mac/status` | Check Mac Studio connectivity |
| POST | `/run/audit` | Run filesystem audit |
| POST | `/run/organize` | Create folder structure |
| POST | `/run/clean` | Scan for old/duplicate files |
| POST | `/run/command` | Run raw command on Mac |
| POST | `/notify` | Send Telegram message |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/<id>` | Get task status |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MAC_STUDIO_IP` | Your Mac Studio's IP (192.168.1.9) |
| `MAC_STUDIO_USER` | Your Mac username (igorcunha) |
| `MAC_SSH_KEY_PATH` | Path to SSH private key |
| `LLM_API_URL` | LM Studio API URL |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |

## Deployment on Render

1. Connect this repo to Render
2. Set root directory to `manus-agents`
3. Add environment variables
4. Upload SSH private key as a Secret File
5. Deploy

## Usage Examples

```bash
# Check if Mac Studio is reachable
curl https://your-render-url.onrender.com/mac/status

# Run filesystem audit
curl -X POST https://your-render-url.onrender.com/run/audit \
  -H "Content-Type: application/json" \
  -d '{"target_path": "~"}'

# Create folder structure (dry run first)
curl -X POST https://your-render-url.onrender.com/run/organize \
  -H "Content-Type: application/json" \
  -d '{"dry_run": true}'

# Run a custom command on Mac
curl -X POST https://your-render-url.onrender.com/run/command \
  -H "Content-Type: application/json" \
  -d '{"command": "ls -la ~"}'

# Send Telegram notification
curl -X POST https://your-render-url.onrender.com/notify \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Manus!"}'
```
