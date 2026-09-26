@echo off
echo Checking for existing processes on Port 1111...
FOR /F "tokens=5" %%a IN ('netstat -ano ^| findstr :1111') DO taskkill /f /pid %%a 2>nul
echo.
echo Starting ATW Velocity Portfolio on local server (Port 1111)...
npm run dev
pause
