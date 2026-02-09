#!/bin/bash
# Run this on your DGX Spark machine to create a secure Cloudflare Tunnel

echo "Setting up Cloudflare Tunnel for DGX Spark..."

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "Downloading cloudflared..."
    curl -L --output cloudflared.tar.gz https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.tar.gz
    tar -xzf cloudflared.tar.gz
    sudo mv cloudflared /usr/local/bin/
    rm cloudflared.tar.gz
fi

echo "Follow these steps:"
echo "1. Login: cloudflared tunnel login"
echo "2. Create tunnel: cloudflared tunnel create dgx-tunnel"
echo "3. Run: cloudflared tunnel run dgx-tunnel"
echo ""
echo "Then update your .env with the Cloudflare Tunnel URLs:"
echo "DGX_API_URL=https://dgx-<tunnel-id>.cfargotunnel.com"
echo "OLLAMA_API_URL=https://ollama-<tunnel-id>.cfargotunnel.com"
