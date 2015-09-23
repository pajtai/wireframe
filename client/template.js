'use strict';

var riot = require('riot'),
    appView = require('./app.tag'),
    wireframe = {
        start : start,
    };

// Template in the required child modules, so riot will work
// ---- //

// Make wireframe an event channel
riot.observable(wireframe);

module.exports = wireframe;

function start(appState) {
    riot.mount(appView, appState);
}
