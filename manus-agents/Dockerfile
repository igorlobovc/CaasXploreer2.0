FROM python:3.11-slim

# Install SSH client
RUN apt-get update && apt-get install -y openssh-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create secrets directory
RUN mkdir -p /etc/secrets

# Expose port
EXPOSE 10000

# Start server
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:10000", "--workers", "2", "--timeout", "300"]
