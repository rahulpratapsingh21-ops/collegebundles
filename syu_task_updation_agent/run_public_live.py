import os
import sys
import time
import subprocess
import re
import socket
import threading

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def start_flask_server():
    from app import app
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cloudflared_exe = os.path.join(base_dir, "cloudflared.exe")
    url_file = os.path.join(base_dir, "current_live_url.txt")
    port = int(os.environ.get("PORT", 5000))
    local_ip = get_local_ip()

    print("\n" + "="*70)
    print("    [+] SYU TASK AUTOMATION AGENT - UNIVERSAL LIVE LAUNCHER")
    print("="*70)
    print(f" [1] Starting Web Studio on all network interfaces (0.0.0.0)...")
    
    flask_thread = threading.Thread(target=start_flask_server, daemon=True)
    flask_thread.start()
    time.sleep(2)

    print(f"\n [2] LOCAL ACCESS (This Computer):")
    print(f"     -> http://localhost:{port}")
    print(f"\n [3] WI-FI / LOCAL NETWORK (Any phone/laptop on same Wi-Fi):")
    print(f"     -> http://{local_ip}:{port}")

    if not os.path.exists(cloudflared_exe):
        print(f"\n [!] cloudflared.exe not found at {cloudflared_exe}")
        while True:
            time.sleep(1)
        return

    print(f"\n [4] WORLDWIDE SECURE HTTPS TUNNEL (Anywhere, Any System, 4G/5G/Office):")
    print("     Connecting to Cloudflare edge network...")

    cmd = [cloudflared_exe, "tunnel", "--url", f"http://127.0.0.1:{port}"]
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        encoding="utf-8",
        errors="replace"
    )

    tunnel_url = None
    url_regex = re.compile(r"https://[a-zA-Z0-9-]+\.trycloudflare\.com")

    for line in proc.stdout:
        match = url_regex.search(line)
        if match and not tunnel_url:
            tunnel_url = match.group(0)
            with open(url_file, "w", encoding="utf-8") as f:
                f.write(tunnel_url)
            print("\n" + "*"*70)
            print(f" [ONLINE] YOUR WORLDWIDE LIVE AGENT URL IS READY:")
            print(f" URL: {tunnel_url}")
            print("*"*70)
            print("\n -> Share this link or open it from ANY phone, tablet, or external PC!")
            print(" -> Works from anywhere in the world without any installation!")
            print("="*70 + "\n")

    proc.wait()

if __name__ == "__main__":
    main()
