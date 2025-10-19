@echo off

REM Build the project
echo Building the project...
npm run build

REM Create a zip file of the build directory
echo Creating deployment zip file...
cd build
powershell Compress-Archive -Path * -DestinationPath ..\mehfil-app-build.zip -Force
cd ..

echo Deployment package created: mehfil-app-build.zip
echo Upload this file to your hosting provider or use it for GitHub Pages deployment.