#!/bin/bash

REPO_OWNER=${1}
REPO_NAME=${2}
DEPLOY_PATH=${3}
PULL_REQUEST=${4}
GIT_TOKEN=${5}

echo "*** running surge deploy ***"
echo "repo owner: $REPO_OWNER"
echo "repo name: $REPO_NAME"
echo "deploy path: $DEPLOY_PATH"
echo "pull request: $PULL_REQUEST"

DEPLOY_SUBDOMAIN_UNFORMATTED_LIST=()
if [ "${PULL_REQUEST}" != "false" ]
then
  DEPLOY_SUBDOMAIN_UNFORMATTED_LIST+=(pr-${PULL_REQUEST})
else
  DEPLOY_SUBDOMAIN_UNFORMATTED_LIST+="commit"
fi

for DEPLOY_SUBDOMAIN_UNFORMATTED in "${DEPLOY_SUBDOMAIN_UNFORMATTED_LIST[@]}"
do
  DEPLOY_SUBDOMAIN=`echo "${DEPLOY_SUBDOMAIN_UNFORMATTED}" | sed -r 's/[\/|\.]+/\-/g'`
  DEPLOY_DOMAIN=https://${REPO_OWNER}-${REPO_NAME}-${DEPLOY_SUBDOMAIN}.surge.sh
  surge --project ${DEPLOY_PATH} --domain ${DEPLOY_DOMAIN};

if [ "${PULL_REQUEST}" != "false" ]
then
  GITHUB_COMMENTS=https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${PULL_REQUEST}/comments
  curl -H "Authorization: token ${GIT_TOKEN}" --request POST ${GITHUB_COMMENTS} --data '{"body":"View storybook at: '${DEPLOY_DOMAIN}'"}'
fi
done
