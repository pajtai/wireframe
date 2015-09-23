'use strict';

var riot = require('riot'),
    appView = require('./app.tag'),
    bulk = require('bulkify');

// ---- //

module.exports = {
    start : start
};

function start(appState) {
    riot.mount(appView, appState);
}