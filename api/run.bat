@echo off
echo Starting API -> http://localhost:5000/swagger
cd /d "%~dp0"
dotnet run --launch-profile http
