'use strict';

var riot = require('riot'),
    appView = require('../views/app/template.tag');

// need to require all nested tags for them to be in scope
require('../views/navigation/template.tag');
require('../views/list/template.tag');
require('../views/header/template.tag');

module.exports = {
    start : start
};

function start(appState) {
    riot.mount(appView, appState);
}