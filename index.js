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
        publicDirectory = path.join(baseDirectory, 'public'),
        wireframePublicDirectory = path.join(__dirname, 'static'),
        port = options.port || 3000;


    var child = exec(__dirname + '/bin/start ' + baseDirectory + ' ' + __dirname);
    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });


    app.use(express.static(wireframePublicDirectory));
    app.use(express.static(publicDirectory));
    app.listen(port);
    console.log('listenting on: ' + port);
}