@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js 24 LTS desde https://nodejs.org/ y vuelve a abrir este archivo.
  pause
  exit /b 1
)
echo Abre http://localhost:3000 en tu navegador.
echo Manten esta ventana abierta mientras usas la web.
node scripts/serve.mjs
pause

