#!/bin/bash

echo 'started storybook copy'
cd packages/wix-ui-core
mkdir temp
cp -R storybook-static/* temp
echo 'finished storybook copy'