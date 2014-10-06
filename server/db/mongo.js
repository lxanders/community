'use strict';

var Promise = require('bluebird'),
    monk = require('monk'),
    db;

function dbConfigurationHasMissingParts(dbConfiguration) {
    return !dbConfiguration || !dbConfiguration.host || !dbConfiguration.name;
}

function configurationContainsStringsOnly(dbConfiguration) {
    return typeof dbConfiguration.host === 'string' && typeof dbConfiguration.name === 'string';
}

function checkDBConfiguration(dbConfiguration) {
    var hostContainsWhiteSpaces,
        nameContainsWhiteSpaces,
        dbConfigurationJSONString = JSON.stringify(dbConfiguration),
        invalidConfigurationMessage = 'Invalid Database configuration: ';

    if (dbConfigurationHasMissingParts(dbConfiguration)) {
        throw new Error('Invalid Database configuration: Missing or empty arguments: ' + dbConfigurationJSONString);
    }

    if (!configurationContainsStringsOnly(dbConfiguration)) {
        throw new Error(invalidConfigurationMessage + 'Host and name have to be strings: ' + dbConfigurationJSONString);
    }

    hostContainsWhiteSpaces = dbConfiguration.host.split(' ').length > 1;
    nameContainsWhiteSpaces = dbConfiguration.name.split(' ').length > 1;

    if (hostContainsWhiteSpaces || nameContainsWhiteSpaces) {
        throw new Error(invalidConfigurationMessage + 'No whitespaces allowed: ' + dbConfigurationJSONString);
    }

    return dbConfiguration && dbConfiguration.host && dbConfiguration.name;
}

function formatConnectionString(dbConfiguration) {
    return dbConfiguration.host + '/' + dbConfiguration.name;
}

function connect(config) {
    var connectionString;

    if (db) {
        return Promise.resolve(db);
    }

    checkDBConfiguration(config.db);

    connectionString = formatConnectionString(config.db);

    return Promise.resolve(monk(connectionString))
        .then(function (database) {
            db = database;

            return db;
        });
}

function insert(collection, document) {
    var errorMessage = 'Invalid arguments: Collection or document missing';

    if (!collection || !document) {
        throw new Error(errorMessage);
    }

    return Promise.resolve(collection.insert(document));
}

module.exports = {
    connect: connect,
    insert: insert
};
