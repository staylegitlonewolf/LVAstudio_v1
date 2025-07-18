#!/bin/bash

# Custom build script for Render deployment
echo "Starting custom build process..."

# Set environment variables to avoid SWC issues
export STRAPI_TELEMETRY_DISABLED=true
export NODE_OPTIONS="--max-old-space-size=4096"
export STRAPI_DISABLE_SWC=true

# Install dependencies
echo "Installing dependencies..."
npm install

# Try to build with SWC disabled
echo "Building Strapi application with SWC disabled..."
export STRAPI_DISABLE_SWC=true
npm run build

echo "Build process completed!" 