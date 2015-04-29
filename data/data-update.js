/**
 * This file converts the old DB structure to the new one
 *
 * Make sure there's a JSON file called silverbirch-export.json
 * at the same level as this file.
 *
 * Run it with:
 *
 * node data-update.js
 */
var filename = 'silverbirch-export',
    fs = require('fs'),
    db = require('./' + filename + '.json');

var output = {};

Object.keys(db).map(function (key) {
  var obj = db[key];

  // new object structure
  output[key] = {};
  output[key].properties = {};
  output[key].relationships = {};

  switch(obj.is_type) {
    case 'task':
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (
            prop === 'has_children' ||
            prop === 'has_users'
          ) {
            output[key].relationships[prop] = obj[prop];
          }
          else {
            output[key].properties[prop] = obj[prop];
          }
        }
      }
      break;

    case 'taskList':
    case 'provider_id':
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if ( prop !== 'is_type' ) {
            output[key].relationships[prop] = obj[prop];
          }
          else {
            output[key].properties[prop] = obj[prop];
          }
        }
      }
      break;

    case 'user':
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (
            prop === 'in_teams' ||
            prop === 'has_task_list'
          ) {
            output[key].relationships[prop] = obj[prop];
          }
          else {
            output[key].properties[prop] = obj[prop];
          }
        }
      }
      break;

    case 'team':
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (
            prop === 'has_users' ||
            prop === 'has_task_list'
          ) {
            output[key].relationships[prop] = obj[prop];
          }
          else {
            output[key].properties[prop] = obj[prop];
          }
        }
      }
      break;
  }
});

var outputFilename = filename + '-updated.json',
    prettyOutput = JSON.stringify(output, null, 2);

fs.writeFileSync(filename + '-updated.json', prettyOutput);
console.log(outputFilename + ' written');
