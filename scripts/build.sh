#!/bin/bash

npm run prebuild &&
    npm run build-legacy &&
    npm run build-modern &&
    npm run headers-tm &&
    npm run readme

declare files=$(find dist -iname "index*")

for file in ${files}; do
    mv "$file" "${file%.js}.user.js"
done
