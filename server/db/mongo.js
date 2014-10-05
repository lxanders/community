'use strict';

var Promise = require('bluebird'),
    monk = require('monk'),
    environment = process.env.NODE_ENV,
    getConfig = require('../config/config').getConfig,
    configPath = '../config',
    config,
    db;

function formatConnectionString(dbConfiguration) {
    return dbConfiguration.host + '/' + dbConfiguration.name;
}

function checkDBConfiguration(dbConfiguration) {
    return dbConfiguration && dbConfiguration.host && dbConfiguration.name;
}

function connect() {
    config = getConfig(environment, configPath, require);

    if (!checkDBConfiguration(config.db)) {
        throw new Error('Database configuration incomplete / missing: ' + JSON.stringify(config.db));
    }

    return Promise.resolve(monk(formatConnectionString(config.db)))
        .then(function (database) {
            db = database;
        });
}

module.exports = {
    connect: connect
};
