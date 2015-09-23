'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    exec = require('child_process').exec;

module.exports = {
    start: start
};

function start(options) {
    var app = express(),
        baseDirectory = options.baseDirectory,
        publicDirectory = path.join(baseDirectory, 'public'),
        wireframePublicDirectory = path.join(__dirname, 'static'),
        port = options.port || 3000,
        child,
        wireFrameUiJSON = require(path.join(baseDirectory, '../wireframe-ui.json')),
        sassFile = '@import "main";\n';

    _.forEach(wireFrameUiJSON.views, function(view) {
        sassFile    += '@import "' + path.join(__dirname,  'static', 'wireframe-ui', view, 'style.scss') + '";\n';
    });

    fs.writeFileSync(path.join(__dirname, 'sass', 'compiled.scss'), sassFile);

    child = exec(__dirname + '/bin/start ' + baseDirectory + ' ' + __dirname);

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