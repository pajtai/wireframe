# wireframe-ui

A way to quickly create interactive and responsive wireframes using HTML, CSS, and JavaScript. 

Demo app is at: https://github.com/wireframe-ui/wireframe-demo

To use:

```
npm install --save wireframe-ui
```

Now create an index.jade (the `wireframe-ui` directory reference in the Jade file will be automatically available to you):

```jade
doctype html
head
    meta(charset='utf-8')
    meta(http-equiv='X-UA-Compatible', content='IE=edge')
    meta(name='viewport', content='width=device-width, initial-scale=1')
    title Wireframe Demo
    link(href='/wireframe-ui/pure/pure-min.css', rel='stylesheet')
    link(href='/wireframe-ui/pure/grids-responsive-min.css', rel='stylesheet')
    link(href='/wireframe-ui/style.css', rel='stylesheet')
body
    app(project='{ opts }')
        // opts is your app state and you can create you html here
```

Then create a `client.js` that will act as the injection point of data into the front end template:
 
```javascript
 'use strict';
 
 var wireframe = require('wireframe-ui/client');
 
 init();
 
 function init() {
     var appState = {
         title : 'Project Title',
         ...
     };
 
     wireframe.start(appState);
 }
 ```
 
 Finally start up the server with `index.js`:
 
```javascript
var wf = require('wireframe-ui');

wf
    .start({
        baseDirectory : __dirname
    });
```

The `wireframe-ui/client` is an [event bus](http://riotjs.com/api/observable/), so you should use it to communicate among views:

```javascript
// click handler
require('wireframe-ui/client').trigger('modal:open', { title : 'yo' }, 'red');

// modal view
require('wireframe-ui/client').on('modal:open', function(message, color) {
```
    
At this point you can start things of with `node app`. `client.js` and `index.jade` are watched for changes while the server is running.    

Tags available are currently in the `views` directory of this project, but will be pulled out into separate npms in the future.

After starting wireframe go to http://localhost:3000/ - port can be customized as the `option.port` passed to `wireframe.start`.

## FAQ:

Q: When I refresh the page, I'm seeing a "Cannot read property 'prototype' of undefined" error in the console that looks like it's in express.
A: You must have required, `wireframe-ui` and not `wireframe-ui/client` somewhere in `client.js` or a `.tag` file.