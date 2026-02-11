#!/bin/bash

# Sanity Studio & Next.js Full Stack Recovery Script
# Cleans build artifacts and reinstalls dependencies

echo "[v0] Cleaning build artifacts..."
rm -rf node_modules .next .sanity dist build

echo "[v0] Removing lock files..."
rm -f pnpm-lock.yaml package-lock.json yarn.lock

echo "[v0] Reinstalling dependencies with pnpm..."
pnpm install

echo "[v0] Build artifacts cleaned and dependencies reinstalled."
echo "[v0] You can now run:"
echo "     pnpm dev              # Start Next.js app (port 3000)"
echo "     cd studio-project-bottleneck && pnpm dev  # Start Sanity studio (port 3333)"
