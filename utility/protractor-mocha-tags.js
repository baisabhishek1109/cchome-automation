// Note: ES6 syntax requires a version of Node.js >= 4.0.0
'use strict';

// Can use any lib (or none, if you choose) to parse args.
// "npm install yargs --save" to use this example as-is
let argv = require('yargs').argv;

const DELIMITER = ',';
const TAG_IDENT = '#';
let tagsOpt = typeof argv.tags === 'string' && argv.tags;
let grepString, tags;

if (tagsOpt) {
    tags = tagsOpt.split(DELIMITER);
    grepString = tags.map(tag => `${TAG_IDENT}${tag}`).join('|');
}

module.exports = function getMochaTags() {
    return grepString;
};