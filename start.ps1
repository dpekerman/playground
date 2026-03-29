# Playground startup script — kills ports 5000 & 4200, then starts API and UI
#
# Run from VS Code terminal or any PowerShell:
#   .\start.ps1
#
# If blocked by execution policy, run once to enable scripts:
#   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

$root = if ($PSScriptRoot) { $PSScriptRoot } else { $PWD.Path }

function Kill-Port {
    param([int]$Port)
    $pids = netstat -ano | Select-String ":$Port\s" | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Where-Object { $_ -match '^\d+$' } | Sort-Object -Unique
    foreach ($p in $pids) {
        try {
            Stop-Process -Id $p -Force -ErrorAction Stop
            Write-Host "  Killed PID $p on port $Port" -ForegroundColor DarkGray
        } catch {
            # Process already gone
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Playground Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# --- Kill existing processes on API and UI ports ---
Write-Host "Freeing ports..." -ForegroundColor Yellow
Kill-Port 5000
Kill-Port 4200
Start-Sleep -Seconds 1
Write-Host "Ports cleared." -ForegroundColor DarkGray
Write-Host ""

# --- Start API ---
Write-Host "[1/2] Starting API  -> http://localhost:5000/swagger" -ForegroundColor Green
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-Command", "cd '$root\api'; Write-Host 'API starting...' -ForegroundColor Green; dotnet run --launch-profile http"
)

Start-Sleep -Seconds 2

# --- Start UI ---
Write-Host "[2/2] Starting UI   -> http://localhost:4200" -ForegroundColor Green
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-Command", "cd '$root\ui'; Write-Host 'UI starting...' -ForegroundColor Green; npm start"
)

Write-Host ""
Write-Host "Both services launching in separate windows." -ForegroundColor Cyan
Write-Host "  API + Swagger : http://localhost:5000/swagger" -ForegroundColor Yellow
Write-Host "  UI            : http://localhost:4200" -ForegroundColor Yellow
Write-Host ""
