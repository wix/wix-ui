#!/bin/bash
# Split on "/", ref: http://stackoverflow.com/a/5257398/689223
REPO_SLUG_ARRAY=(${TRAVIS_REPO_SLUG//\// })
REPO_OWNER=${REPO_SLUG_ARRAY[0]}
REPO_NAME=${REPO_SLUG_ARRAY[1]}
# DEPLOY_PATH="/home/travis/build/wix/wix-ui/packages/wix-ui-core/storybook-static"

DEPLOY_PATH="/home/travis/build/${REPO_OWNER}/${REPO_NAME}/${STORYBOOK_DIST}"


DEPLOY_SUBDOMAIN_UNFORMATTED_LIST=()
if [ "$TRAVIS_PULL_REQUEST" != "false" ]
then
  DEPLOY_SUBDOMAIN_UNFORMATTED_LIST+=(pr-${TRAVIS_PULL_REQUEST})
fi

for DEPLOY_SUBDOMAIN_UNFORMATTED in "${DEPLOY_SUBDOMAIN_UNFORMATTED_LIST[@]}"
do
  # replaces "/" or "." with "-"
  # sed -r is only supported in linux, ref http://stackoverflow.com/a/2871217/689223
  # Domain names follow the RFC1123 spec [a-Z] [0-9] [-]
  # The length is limited to 253 characters
  # https://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_syntax
  DEPLOY_SUBDOMAIN=`echo "$DEPLOY_SUBDOMAIN_UNFORMATTED" | sed -r 's/[\/|\.]+/\-/g'`
  DEPLOY_DOMAIN=https://${REPO_OWNER}-${REPO_NAME}-${DEPLOY_SUBDOMAIN}.surge.sh
  surge --project ${DEPLOY_PATH} --domain $DEPLOY_DOMAIN;
  if [ "$TRAVIS_PULL_REQUEST" != "false" ]
  then
    # Using the Issues api instead of the PR api
    # Done so because every PR is an issue, and the issues api allows to post general comments,
    # while the PR api requires that comments are made to specific files and specific commits
    GITHUB_PR_COMMENTS=https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments
    curl -H "Authorization: token ${GITHUB_API_TOKEN}" --request POST ${GITHUB_PR_COMMENTS} --data '{"body":"Travis automatic deployment: '${DEPLOY_DOMAIN}'"}'
  fi
done