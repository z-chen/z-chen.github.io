#!/bin/sh

npm install

mkdir -p static/build

./node_modules/.bin/watchify -s App \
  static/main_site/main.jsx \
  -o static/build/main_bundle.js \
  -v \
  -t [ babelify --extensions .jsx ] \
  -d
