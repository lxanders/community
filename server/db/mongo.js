'use strict';

var _ = require('underscore'),
    Promise = require('bluebird'),
    monk = require('monk'),
    db,
    databaseNotConnectedErrorMessage = 'Database not (yet) connected';

function dbConfigurationHasMissingParts(dbConfiguration) {
    return !dbConfiguration || !dbConfiguration.host || !dbConfiguration.name;
}

function configurationContainsStringsOnly(dbConfiguration) {
    return typeof dbConfiguration.host === 'string' && typeof dbConfiguration.name === 'string';
}

function configurationContainsWhitespaces(dbConfiguration) {
    var hostContainsWhiteSpaces = dbConfiguration.host.split(' ').length > 1,
        nameContainsWhiteSpaces = dbConfiguration.name.split(' ').length > 1;

    return hostContainsWhiteSpaces || nameContainsWhiteSpaces;
}

function checkDBConfiguration(dbConfiguration) {
    var dbConfigurationJSONString = JSON.stringify(dbConfiguration),
        invalidConfigurationMessage = 'Invalid Database configuration: ';

    if (dbConfigurationHasMissingParts(dbConfiguration)) {
        throw new Error('Invalid Database configuration: Missing or empty arguments: ' + dbConfigurationJSONString);
    }

    if (!configurationContainsStringsOnly(dbConfiguration)) {
        throw new Error(invalidConfigurationMessage + 'Host and name have to be strings: ' + dbConfigurationJSONString);
    }

    if (configurationContainsWhitespaces(dbConfiguration)) {
        throw new Error(invalidConfigurationMessage + 'No whitespaces allowed: ' + dbConfigurationJSONString);
    }

    return true;
}

function formatConnectionString(dbConfiguration) {
    return dbConfiguration.host + '/' + dbConfiguration.name;
}

function hasValidUsernameIndex(indexes) {
    var usernameIndexName = 'username_1',
        usernameIndex = [
            [ 'username', 1 ]
        ];

    return _.isEqual(indexes[usernameIndexName], usernameIndex);
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

function indexes(collection) {
    if (!collection) {
        throw new Error(databaseNotConnectedErrorMessage);
    } else if (typeof collection.indexes !== 'function') {
        throw new Error('Specified collection is not a valid database collection (indexes function is not defined)')
    }

    return Promise.resolve(collection.indexes());
}

function checkIndexes() {
    if (!db) {
        throw new Error(databaseNotConnectedErrorMessage);
    }

    return Promise.try(db.get.bind(null, 'users'))
        .then(indexes)
        .then(function (indexes) {
            if (!hasValidUsernameIndex(indexes)) {
                throw new Error('Username index missing in users collection');
            }
        });
}

module.exports = {
    connect: connect,
    insert: insert,
    indexes: indexes,
    checkIndexes: checkIndexes
};
