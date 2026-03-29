# Playground startup script
# Runs the .NET API and Angular UI in separate terminal windows
#
# Usage (run from project root):
#   powershell -ExecutionPolicy Bypass -File .\start.ps1

$root = if ($PSScriptRoot) { $PSScriptRoot } else { $PWD.Path }

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Playground Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start API in a new window
Write-Host "[1/2] Starting API  -> http://localhost:5000/swagger" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", "cd '$root\api'; Write-Host 'API starting...' -ForegroundColor Green; dotnet run --launch-profile http"

Start-Sleep -Seconds 2

# Start UI in a new window
Write-Host "[2/2] Starting UI   -> http://localhost:4200" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", "cd '$root\ui'; Write-Host 'UI starting...' -ForegroundColor Green; npm start"

Write-Host ""
Write-Host "Both services are launching in separate windows." -ForegroundColor Cyan
Write-Host "  API + Swagger : http://localhost:5000/swagger" -ForegroundColor Yellow
Write-Host "  UI            : http://localhost:4200" -ForegroundColor Yellow
Write-Host ""
