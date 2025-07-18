#!/bin/bash

# Production start script with graceful shutdown handling
echo "Starting LVA Studio Backend in production mode..."

# Set production environment
export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

# Function to handle graceful shutdown
graceful_shutdown() {
    echo "Received shutdown signal, starting graceful shutdown..."
    
    # Send SIGTERM to Strapi process
    if [ ! -z "$STRAPI_PID" ]; then
        echo "Sending SIGTERM to Strapi process (PID: $STRAPI_PID)..."
        kill -TERM $STRAPI_PID
        
        # Wait for graceful shutdown (up to 30 seconds)
        for i in {1..30}; do
            if ! kill -0 $STRAPI_PID 2>/dev/null; then
                echo "Strapi process terminated gracefully"
                exit 0
            fi
            sleep 1
        done
        
        # Force kill if still running
        echo "Force killing Strapi process..."
        kill -KILL $STRAPI_PID
    fi
    
    exit 0
}

# Set up signal handlers
trap graceful_shutdown SIGTERM SIGINT

# Start Strapi in production mode
echo "Starting Strapi server..."
npm run start:production &
STRAPI_PID=$!

# Wait for the process
wait $STRAPI_PID 