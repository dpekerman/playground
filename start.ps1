# Playground startup script
# Runs the .NET API and Angular UI in separate terminal windows

$root = $PSScriptRoot

Write-Host "Starting Playground..." -ForegroundColor Cyan
Write-Host ""

# Start API
Write-Host "Starting API  ->  http://localhost:5000" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\api'; dotnet run --launch-profile http"

Start-Sleep -Seconds 2

# Start UI
Write-Host "Starting UI   ->  http://localhost:4200" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\ui'; npm start"

Write-Host ""
Write-Host "Both services launching. Open http://localhost:4200 in your browser." -ForegroundColor Cyan
