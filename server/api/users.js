'use strict';

var mongo = require('../db/mongo');

function getUsersCollection(database) {
    return database.get('users');
}

function insertUser(user, usersCollection) {
    return mongo.insert(usersCollection, user);
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
