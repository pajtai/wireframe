'use strict';

var riot = require('riot'),
    appView = require('./app.tag');

// ---- //

module.exports = {
    start : start
};

function start(appState) {
    riot.mount(appView, appState);
}