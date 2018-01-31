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