#!/bin/bash

# Clear Next.js build cache and node_modules cache
echo "Clearing Next.js build cache..."
rm -rf .next

echo "Clearing pnpm store (optional)..."
# pnpm store prune

echo "Cache cleared successfully!"
echo ""
echo "Next steps:"
echo "1. Run: pnpm install"
echo "2. Run: pnpm dev"
echo "3. The error should be resolved"
