'use strict';

var express = require('express'),
    path = require('path'),
    exec = require('child_process').exec;

module.exports = {
    start: start
};

function start(options) {
    var app = express(),
        baseDirectory = options.baseDirectory,
        publicDirectory = path.join(baseDirectory, 'public');

    app.use(express.static(publicDirectory));
    app.listen(options.port || 3000);

    var child = exec('./bin/start');
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });
}