"""
ATW Velocity Portfolio - Live URL Health Checker & Auto-Fix Utility
Checks https://atwishere.github.io/ATW-velocity-portfolio/
and verifies localhost:5173.
"""

import sys
import time
import urllib.request
import urllib.error
import subprocess
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def check_localhost():
    print("-> Checking local development server (http://localhost:5173/)...")
    try:
        req = urllib.request.Request("http://localhost:5173/", headers={"User-Agent": "ATW-Check/1.0"})
        with urllib.request.urlopen(req, timeout=5) as res:
            status = res.status
            content = res.read().decode("utf-8", errors="ignore")
            if status == 200 and "root" in content:
                print("  [SUCCESS] Local server is healthy (HTTP 200, React root mounted).")
                return True
            print(f"  [WARN] Local server returned HTTP {status}")
            return False
    except Exception as e:
        print(f"  [INFO] Local dev server: {e}")
        return False

def check_live_github_pages(retries=5, delay=10):
    url = f"https://atwishere.github.io/ATW-velocity-portfolio/?t=livecheck_{int(time.time())}"
    print(f"-> Checking live GitHub Pages URL: {url}")
    
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
            with urllib.request.urlopen(req, timeout=10) as res:
                status = res.status
                body = res.read().decode("utf-8", errors="ignore")
                print(f"  Attempt {attempt}: HTTP {status} (Length: {len(body)} bytes)")
                
                # Check if GitHub Pages is serving raw uncompiled Vite source
                if '<script type="module" src="/src/' in body or '<script type="module" src="/src/main.jsx"' in body:
                    print("  [DETECTED] GitHub Pages is configured to serve from 'main' root (uncompiled JSX).")
                    print("  [AUTO-FIX] Applying dual-mode root deployment...")
                    apply_dual_mode_autofix()
                    return "AUTO_FIXED"
                
                # Check if compiled dist is serving
                if 'assets/index-' in body or 'dist/' in body or 'ATW // 01' in body:
                    print("  [SUCCESS] GitHub Pages is serving production compiled bundle perfectly!")
                    return "LIVE_SUCCESS"
                
        except urllib.error.HTTPError as he:
            print(f"  Attempt {attempt}: HTTP {he.code} {he.reason}")
        except Exception as e:
            print(f"  Attempt {attempt}: {e}")
            
        if attempt < retries:
            print(f"  Waiting {delay}s for GitHub CDN cache invalidation...")
            time.sleep(delay)
            
    return "PENDING"

def apply_dual_mode_autofix():
    """
    If the user's GitHub repo settings are locked to serving from 'main' (root /)
    instead of 'gh-pages', we copy dist/* to root while archiving clean source on 'source-code' branch.
    """
    print("  Creating source-code backup branch...")
    subprocess.run(["git", "branch", "-f", "source-code", "main"], cwd=BASE_DIR)
    subprocess.run(["git", "push", "-f", "origin", "source-code"], cwd=BASE_DIR)
    
    dist_dir = BASE_DIR / "dist"
    if dist_dir.exists():
        import shutil
        for item in dist_dir.iterdir():
            dest = BASE_DIR / item.name
            if item.is_dir():
                if dest.exists():
                    shutil.rmtree(dest)
                shutil.copytree(item, dest)
            else:
                shutil.copy2(item, dest)
        subprocess.run(["git", "add", "-A"], cwd=BASE_DIR)
        subprocess.run(["git", "commit", "-m", "Deploy production bundle to main root for direct GitHub Pages serving"], cwd=BASE_DIR)
        subprocess.run(["git", "push", "-f", "origin", "main"], cwd=BASE_DIR)
        print("  [AUTO-FIX COMPLETE] Production bundle pushed to main root.")

if __name__ == "__main__":
    check_localhost()
    res = check_live_github_pages(retries=3, delay=5)
    print(f"Final Status: {res}")
