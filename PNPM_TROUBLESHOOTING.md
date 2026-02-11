# PNPM EPERM Error Resolution Guide

## Error Details
```
Error: Command failed with exit code 1 (EPERM): pnpm add --save-prod styled-components@^6.1.15
```

EPERM = "Error Permission" - pnpm cannot read/write files due to permission issues or corrupted lock files.

## Solution 1: Quick Fix (Try First)
```bash
# Clear pnpm cache and store
pnpm store prune

# Remove corrupted lock file
rm pnpm-lock.yaml

# Reinstall
pnpm install
```

## Solution 2: Deep Clean
```bash
# Run the provided cleanup script
bash fix-pnpm-error.sh
```

## Solution 3: Manual Nuclear Option
```bash
rm -rf node_modules pnpm-lock.yaml .pnpm-store
rm -rf ~/.pnpm-store  # On macOS/Linux
pnpm install --force
```

## Why This Happened
- pnpm lock file became corrupted during a previous install
- File permissions changed in node_modules
- Interrupted installation or system process
- Conflicting package versions (styled-components isn't needed - we use Tailwind)

## Prevention
- Always use `pnpm install` before adding new packages
- Don't manually edit pnpm-lock.yaml
- Close IDEs/terminals before cleaning dependencies
- Use consistent Node.js version (18+)

## For Studio Setup
After fixing pnpm issues, run:
```bash
cd studio-project-bottleneck
pnpm install
pnpm dev  # Starts on localhost:3333
```

## For Next.js App
```bash
pnpm install
pnpm dev  # Starts on localhost:3000
```
