#!/bin/sh

bash scripts/prepare.sh

root=$PWD

cd $root && ./node_modules/.bin/lerna publish
