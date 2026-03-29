@echo off
echo Killing processes on ports 5000 and 4200...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000 "') do (
    echo   Killing PID %%a on port 5000
    taskkill /PID %%a /F >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":4200 "') do (
    echo   Killing PID %%a on port 4200
    taskkill /PID %%a /F >nul 2>&1
)

echo Ports cleared.
