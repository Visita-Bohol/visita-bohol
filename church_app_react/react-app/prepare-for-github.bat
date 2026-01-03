@echo off
echo ========================================
echo Preparing Visita Bohol for GitHub Upload
echo ========================================
echo.

echo Copying data files to public folder...
if exist "..\churches.json" (
    copy /Y "..\churches.json" "public\churches.json"
    echo ✓ churches.json copied
) else (
    echo ✗ churches.json not found in parent directory
)

if exist "..\prayers.json" (
    copy /Y "..\prayers.json" "public\prayers.json"
    echo ✓ prayers.json copied
) else (
    echo ✗ prayers.json not found in parent directory
)

echo.
echo ========================================
echo Files ready for GitHub!
echo ========================================
echo.
echo Next steps:
echo 1. Compress this 'react-app' folder into a ZIP file
echo 2. Upload to GitHub
echo 3. When someone clones it, they just need to run:
echo    - npm install
echo    - npm run dev
echo.
echo Or you can initialize a git repository:
echo    - git init
echo    - git add .
echo    - git commit -m "Initial commit"
echo    - git remote add origin YOUR_GITHUB_URL
echo    - git push -u origin main
echo ========================================
pause
