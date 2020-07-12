#!/bin/sh

./node_modules/.bin/babel packages/core/src --out-dir packages/core/dist


./node_modules/.bin/babel packages/webpack-loader/src --out-dir packages/webpack-loader/dist


./node_modules/.bin/babel packages/webpack-plugin/src --out-dir packages/webpack-plugin/dist

