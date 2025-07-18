#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Set environment variables
export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Removing SWC dependencies to prevent native binding issues..."
npm uninstall @swc/core @swc/cli @swc/helpers || true

echo "Installing dependencies..."
npm ci --only=production

echo "Removing any remaining SWC packages..."
npm uninstall @swc/core @swc/cli @swc/helpers || true

echo "Building Strapi application..."
npm run build:render

echo "Build completed successfully!" 