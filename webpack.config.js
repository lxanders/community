'use strict';

var path = require('path'),
    buildPath = path.join(__dirname, 'build'),
    jsPath = path.join(buildPath, 'js'),
    environment,
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

/* eslint-disable no-process-env */
environment = process.env.NODE_ENV;
/* eslint-ensable no-process-env */

if (environment === 'development') {
    config.devtool = '#source-map';
}

module.exports = config;
