'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    exec = require('child_process').exec,
    execSync = require('child_process').execSync;

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
        jsTemplate = '' + fs.readFileSync(path.join(__dirname, 'client', 'template.js')),
        sassFile = '@import "main";\n',
        jsIncludes = '';

    _.forEach(wireFrameUiJSON.views, function(view) {
        sassFile    += '@import "' + path.join(__dirname,  'static', 'wireframe-ui', view, 'style.scss') + '";\n';
        jsIncludes  += "require('../static/wireframe-ui/" + view + "/template.tag');\n";
    });

    fs.writeFileSync(path.join(__dirname, 'sass', 'compiled.scss'), sassFile);
    fs.writeFileSync(path.join(__dirname, 'client', 'index.js'), jsTemplate.replace('// ---- //', jsIncludes))

    execSync('bower install', {
        cwd : __dirname
    });

    _.forEach(wireFrameUiJSON.views, function(view) {
        execSync('bower install ' + view, {
            cwd : __dirname
        });
    });

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