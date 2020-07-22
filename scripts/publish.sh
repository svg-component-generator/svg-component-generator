#!/bin/sh

bash scripts/prepare.sh

root=$PWD

cd $root/packages/core && npm run copy

cd $root/packages/webpack-loader && npm run copy

cd $root/packages/webpack-plugin && npm run copy


cd $root && ./node_modules/.bin/lerna publish
