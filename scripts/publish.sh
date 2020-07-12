#!/bin/sh

./node_modules/.bin/babel packages/core/src --out-dir packages/core/dist
cp packages/core/package.json packages/core/dist


./node_modules/.bin/babel packages/webpack-loader/src --out-dir packages/webpack-loader/dist
cp packages/webpack-loader/package.json packages/webpack-loader/dist


./node_modules/.bin/babel packages/webpack-plugin/src --out-dir packages/webpack-plugin/dist
cp packages/webpack-plugin/package.json packages/webpack-plugin/dist


./node_modules/.bin/lerna publish
