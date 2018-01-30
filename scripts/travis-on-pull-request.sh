#!/bin/bash

echo 'started storybook copy'
echo 'this is the current working directory:'
pwd
echo $greet
cd /home/travis/build/wix/wix-ui/packages/wix-ui-core
pwd
ls -l | grep temp
mkdir temp
cp -R storybook-static/* temp
echo 'finished storybook copy'