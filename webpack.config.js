'use strict';

var path = require('path'),
    buildPath = path.join(__dirname, 'build'),
    jsPath = path.join(buildPath, 'js'),
    config;

config = {
    resolve: {
        extensions: [ '', '.js', '.jsx' ]
    },
    entry: './client/index.js',
    output: {
        path: jsPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    }
};

if (process.env.NODE_ENV === 'development') {
    config.devtool = '#source-map';
}

module.exports = config;
