# wireframe-ui

# Currently pre alphap - demo app is at: https://github.com/pajtai/wireframe-demo

Simple express app to server wireframes.
Wireframe views are pulled in as npms.

```javascript
var wireframe = require('wireframe-ui');

wireframe
    .start({
        baseDirectory : __dirname
    });

```

There are 3 files that are watched and built in `baseDirectory`:

# `index.jade` built to `public/index.html`
# `main.scss` built to `public/style.css` and `public/style.map`
# `main.js` buil to `public/bundle.js`

After starting wireframe go to http://localhost:3000/ - port can be customized as the `option.port` passed to `wireframe.start`.
