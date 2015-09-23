'use strict';

var riot = require('riot'),
    appView = require('./app.tag'),
    bulk = require('bulkify');

require('../static/wireframe-ui/wireframe-ui-header/template.tag');
require('../static/wireframe-ui/wireframe-ui-list/template.tag');
require('../static/wireframe-ui/wireframe-ui-navigation/template.tag');

module.exports = {
    start : start
};

function start(appState) {
    riot.mount(appView, appState);
}