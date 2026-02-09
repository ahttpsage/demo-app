#!/bin/bash

# Start script for Priyatosh Portfolio Site

echo "🚀 Starting Priyatosh Portfolio..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✨ Starting development server..."
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
