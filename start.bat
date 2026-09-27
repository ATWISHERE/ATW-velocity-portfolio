@echo off
echo [1/3] Stopping any old server on port 1111...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :1111') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo [2/3] Starting ATW Server in background (Localhost + LAN)...
start "ATW_Background_Server" /MIN cmd /c "python -m http.server 1111 --bind 0.0.0.0"
timeout /t 1 /nobreak >nul
echo [3/3] Opening http://localhost:1111/ in your browser...
start http://localhost:1111/
echo.
echo [DONE] Server is LIVE in the background!
echo   Localhost : http://localhost:1111/
echo   Network   : http://192.168.1.7:1111/
