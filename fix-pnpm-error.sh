#!/bin/bash

# Emergency cleanup script for EPERM and permission errors
# Use this if pnpm encounters permission/lock issues

echo "[v0] Emergency cleanup for EPERM errors..."

# Clear pnpm store
pnpm store prune

# Remove corrupted lock file
rm -f pnpm-lock.yaml

# Remove node_modules completely
rm -rf node_modules

# Clear pnpm cache
pnpm cache clean

# Fresh install
pnpm install --force

echo "[v0] Cleanup complete. Retry your original command."
