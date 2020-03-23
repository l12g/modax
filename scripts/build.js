const cp = require('child_process');
const fs = require('fs');
const path = require('path');

cp.execSync('webpack --config ' + path.resolve(process.cwd(), 'webpack.config.js'));
fs.copyFileSync('dist/modal-x.js', 'docs/modal-x.js');
