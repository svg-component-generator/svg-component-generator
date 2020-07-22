#!/bin/sh

rm -rf packages/core/dist
./node_modules/.bin/babel --config-file ./.babelrc.js packages/core/src --out-dir packages/core/dist --extensions .ts


rm -rf packages/webpack-loader/dist
./node_modules/.bin/babel --config-file ./.babelrc.js packages/webpack-loader/src --out-dir packages/webpack-loader/dist --extensions .ts


rm -rf packages/webpack-plugin/dist
./node_modules/.bin/babel --config-file ./.babelrc.js packages/webpack-plugin/src --out-dir packages/webpack-plugin/dist --extensions .ts

