#!/bin/bash

REPO_OWNER="wix-private"
REPO_NAME=${TEAMCITY_BUILDCONF_NAME}
REPO_SLUG=${REPO_OWNER}/${REPO_NAME}
DEPLOY_PATH=${1}
PACKAGE_NAME="$(node -pe 'JSON.parse(process.argv[1]).name' "$(cat package.json)")"

if [ ${REPO_NAME} != ${PACKAGE_NAME} ]
then
  REPO_NAME=${REPO_NAME}/${PACKAGE_NAME}
fi

if [ ! -z "${VCS_BRANCH_NAME}" ]
then
  PULL_REQUEST=${VCS_BRANCH_NAME}
else
  PULL_REQUEST="false"
fi

./surge-deploy.sh ${REPO_OWNER} ${REPO_NAME} ${DEPLOY_PATH} ${PULL_REQUEST} ${GITHUB_API_TOKEN}
