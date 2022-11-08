#!/usr/bin/env sh
# abort on errors
set -e

git add .
git commit -m"automatic push"
git push

npm run deploy