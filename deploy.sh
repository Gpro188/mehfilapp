#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a zip file of the build directory
echo "Creating deployment zip file..."
cd build
zip -r ../mehfil-app-build.zip .
cd ..

echo "Deployment package created: mehfil-app-build.zip"
echo "Upload this file to your hosting provider or use it for GitHub Pages deployment."