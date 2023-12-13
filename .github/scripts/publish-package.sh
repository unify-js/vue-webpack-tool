#!/bin/bash

source ./.github/scripts/utils.sh

npm ci || utils::check_fail $? "npm ci failed"

npx changeset version || utils::check_fail $? "npx changeset version failed"

is_modify=$(git status --porcelain)

if [ ! -z "$is_modify" ]; then
    echo "packages version changed"

    npm install || utils::check_fail $? "npm install failed" 
    npm run build || utils::check_fail $? "npm run build failed"

    git config user.name "luohuidong"
    git config user.email "luohuidong01@126.com"
    git add .
    git commit -m "build: update packages version"

    npm publish || utils::check_fail $? "npm publish failed"

    git push || utils::check_fail $? "git push failed"

    npm install cnpm -g
    cnpm sync @unify-js/vue-webpack-tool 
else
    echo "packages version not changed"
fi
