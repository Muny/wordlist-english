'use strict';

var fs = require('fs');
var path = require('path');

function splitWordlist (contents) {
  return contents.trim().split('\n');
}

function removePossesives (words) {
  return words.filter(function (word) {
    return !/'s$/.test(word);
  });
}

function processWordlist (wordlist) {
  return removePossesives(splitWordlist(wordlist)).sort();
}

function getWordlist (name, frequency) {
  var filePath = path.join(__dirname, '..', 'sources', name + '.' + frequency);
  return processWordlist(fs.readFileSync(filePath, 'utf8'));
}

['english', 'american', 'british', 'canadian'].forEach(function (nationality) {
  [10, 20, 35, 40, 50, 55, 60, 70].forEach(function (frequency) {
    var filePath = path.join(__dirname, '..', nationality + '-words-' + frequency + '.json');
    fs.writeFileSync(filePath, JSON.stringify(getWordlist(nationality + '-words', frequency)));
  });
});
