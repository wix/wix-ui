#!/usr/bin/env bash

export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh";
if [ -f .nvmrc ]; then
  echo "Running nvm use"
  nvm use &> /dev/null || exit 1
fi

echo "Now using node $(node -v) (npm v$(npm -v))"

npm run postPRBuild
