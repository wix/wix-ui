# Storybook Automatic Deployment
> A guide for using travis to automatically deploy a project storybook's statics after build.

### Travis Environment Variables
In your project travis config add the following environment variables:
* `GITHUB_API_TOKEN`: Please contact project maintainer.
* `SURGE_LOGIN`: Please contact project maintainer.
* `SURGE_TOKEN`: Please contact project maintainer.
* `STORYBOOK_DIST`: The path for the project's storybook-statics folder, just `storybook-statics` for normal non mono-repo projects.  

### In your project:
#### Install Surge
Run: `npm install surge --save-dev`.  
#### Add travis.yml
Add/Update a file named `travis.yml` with: `'- ./scripts/surge-deploy.sh'`.  

Example from `wix-ui`:
<pre>
sudo: required
dist: trusty
language: node_js
node_js:
  - 8.9.1

before_install:
 - export CHROME_BIN=/usr/bin/google-chrome
 - export DISPLAY=:99.0
 - sh -e /etc/init.d/xvfb start
 - sudo apt-get update
 - sudo apt-get install -y libappindicator1 fonts-liberation
 - wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
 - sudo dpkg -i google-chrome*.deb
 
script:
 - npm run bootstrap && npm run test
 - npm install surge
 - 'if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then bash ./scripts/surge-deploy.sh; fi'

notifications:
  email:
    recipients:
      - fed-infra@wix.com

</pre>
#### Add surge-deploy.sh
Add the following bash script to your project and update the path in `travis.yml`:
```bash
#!/bin/bash
REPO_SLUG_ARRAY=(${TRAVIS_REPO_SLUG//\// })
REPO_OWNER=${REPO_SLUG_ARRAY[0]}
REPO_NAME=${REPO_SLUG_ARRAY[1]}
DEPLOY_PATH="/home/travis/build/${REPO_OWNER}/${REPO_NAME}/${STORYBOOK_DIST}"

DEPLOY_SUBDOMAIN_UNFORMATTED_LIST=()
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  DEPLOY_SUBDOMAIN_UNFORMATTED_LIST+=(pr-${TRAVIS_PULL_REQUEST})
else
  DEPLOY_SUBDOMAIN_UNFORMATTED_LIST+=(pr-${TRAVIS_COMMIT})
fi

for DEPLOY_SUBDOMAIN_UNFORMATTED in "${DEPLOY_SUBDOMAIN_UNFORMATTED_LIST[@]}"
do
  DEPLOY_SUBDOMAIN=`echo "$DEPLOY_SUBDOMAIN_UNFORMATTED" | sed -r 's/[\/|\.]+/\-/g'`
  DEPLOY_DOMAIN=https://${REPO_OWNER}-${REPO_NAME}-${DEPLOY_SUBDOMAIN}.surge.sh
  surge --project ${DEPLOY_PATH} --domain $DEPLOY_DOMAIN;
  
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  GITHUB_COMMENTS=https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments
else
  GITHUB_COMMENTS=https://api.github.com/repos/${TRAVIS_REPO_SLUG}/commits/${TRAVIS_COMMIT}/comments
fi
  curl -H "Authorization: token ${GITHUB_API_TOKEN}" --request POST ${GITHUB_COMMENTS} --data '{"body":"View storybook at: '${DEPLOY_DOMAIN}'"}'
done
```
