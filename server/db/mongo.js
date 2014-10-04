'use strict';

var Promise = require('bluebird'),
    monk = require('monk'),
    db;

function formatConnectionString(dbConfiguration) {
    return dbConfiguration.host + '/' + dbConfiguration.name;
}

function checkDBConfiguration(dbConfiguration) {
    return dbConfiguration && dbConfiguration.host && dbConfiguration.name;
}

function connect(dbConfiguration) {
    if (!checkDBConfiguration(dbConfiguration)) {
        throw new Error('Database configuration incomplete / missing: ' + JSON.stringify(dbConfiguration));
    }

    return Promise.resolve(monk(formatConnectionString(dbConfiguration)))
        .then(function (database) {
            db = database;
        });
}

module.exports = {
    connect: connect,
    db: db
};
