'use strict';
var exec = require('child_process').exec;
var os = require('os');
var proSettings = require('./config/os.json');
var command = proSettings[os.platform()].command;

command = command + " start";
exec(command, function (err, stdout, stderr) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
}); 
