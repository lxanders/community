'use strict';

var Promise = require('bluebird'),
    mongo = require('../db/mongo');

function getUsersCollection(database) {
    return database.get('users');
}

function insertUser(user, usersCollection) {
    return Promise.resolve(usersCollection.insert(user))
        .then(function () {
            return user;
        });
}

function registerUser(req, res) {
    var user = req.body;

    mongo.connect()
        .then(getUsersCollection)
        .then(insertUser.bind(null, user))
        .then(function (insertedUser) {
            res
                .location('/users/' + insertedUser.username)
                .status(201)
                .json(insertedUser);
        });
}

module.exports = {
    registerUser: registerUser
};
