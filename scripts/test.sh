#!/bin/sh

bash scripts/prepare.sh

./node_modules/.bin/lerna link --force-local

jest
