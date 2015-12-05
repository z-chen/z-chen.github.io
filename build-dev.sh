#!/bin/sh

npm install

mkdir -p static/build

./node_modules/.bin/watchify -s App \
  static/main.jsx \
  -o static/build/bundle.js \
  -v \
  -t [ babelify --extensions .jsx ] \
  -d
