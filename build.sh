#!/bin/sh

npm install && npm update
cp node_modules/image-url-parser/index.js src/image-url-parser.js
zip src.zip src/*.*
