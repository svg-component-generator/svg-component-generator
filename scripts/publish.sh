#!/bin/sh

bash scripts/prepare.sh

cp packages/core/package.json packages/core/dist

cp packages/webpack-loader/package.json packages/webpack-loader/dist

cp packages/webpack-plugin/package.json packages/webpack-plugin/dist


./node_modules/.bin/lerna publish
