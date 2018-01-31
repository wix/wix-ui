#!/bin/bash

echo 'started storybook copy'
echo $greet
cd /home/travis/build/wix/wix-ui/packages/wix-ui-core/
pwd
mkdir temp
cp -R storybook-static/* temp
echo ls -l | grep temp
echo 'testing push on PR'
echo 'finished storybook copy'
