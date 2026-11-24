const path = require('path');

// Cesium 1.93 (pinned by @auscope/angular-cesium) has a Node-only code path in
// Resource.js that requires these built-ins; stub them for the browser bundle.
const builtins = /^(url|http|https|zlib)$/;

module.exports = {
  name: 'legacy-cesium-deps',
  setup(build) {
    build.onResolve({ filter: builtins }, (args) => ({ path: args.path, namespace: 'node-builtins-stub' }));
    build.onLoad({ filter: /.*/, namespace: 'node-builtins-stub' }, () => ({ contents: 'module.exports = {};', loader: 'js' }));
    // when.js (used by angular-cesium) passes `require` around as a value, which
    // esbuild cannot bundle; use its self-contained browser build instead.
    build.onResolve({ filter: /^when$/ }, () => ({ path: path.join(__dirname, '../node_modules/when/dist/browser/when.js') }));
  },
};
