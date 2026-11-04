#!/usr/bin/env bash
# Update the site on the VPS: pull, install, build, restart.
# Run from the project folder on the server: ./scripts/deploy.sh [branch]
set -euo pipefail

BRANCH="${1:-main}"
cd "$(dirname "$0")/.."

echo "→ Fetching $BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "→ Installing dependencies"
pnpm install --frozen-lockfile

echo "→ Building"
pnpm build

echo "→ Restarting"
if pm2 describe portfolio >/dev/null 2>&1; then
  pm2 reload portfolio
else
  pm2 start ecosystem.config.cjs
  pm2 save
fi

echo "✓ Deployed $(git rev-parse --short HEAD)"
