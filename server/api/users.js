'use strict';

var Promise = require('bluebird'),
    mongo = require('../db/mongo'),
    validationErrorMessage = 'Validation error(s).',
    userValidationRules = {
        username: {
            minimumLength: 4,
            maximumLength: 40,
            validUsernameRegex: /^\w{4,40}$/
        },
        password: {
            minimumLength: 6,
            maximumLength: 60,
            validUsernameRegex: /^.{6,60}$/
        }
    };

function getUsersCollection(database) {
    return database.get('users');
}

function checkUsernameFormat(username) {
    var validUsernameRegex = userValidationRules.username.validUsernameRegex;

    return username && typeof username === 'string' && validUsernameRegex.test(username);
}

function formatUsernameValidationError() {
    var minimumLength = userValidationRules.username.minimumLength,
        maximumLength = userValidationRules.username.maximumLength,
        lengthRange = 'length between ' + minimumLength + '-' + maximumLength,
        characters = 'Alphanumerical ascii compliant characters (a-z, A-Z, 0-9, _, no whitespaces)',
        validUsernameFormatMessage = 'Valid input: ' + characters + ', ' + lengthRange;

    return 'Invalid username. ' + validUsernameFormatMessage + '.';
}

function checkPasswordFormat(password) {
    var validPasswordRegex = userValidationRules.password.validUsernameRegex;

    return password && typeof password === 'string' && validPasswordRegex.test(password);
}

function formatPasswordValidationError() {
    var minimumLength = userValidationRules.password.minimumLength,
        maximumLength = userValidationRules.password.maximumLength,
        lengthRange = 'Password length between ' + minimumLength + '-' + maximumLength,
        validPasswordFormatMessage = 'Valid input: ' + lengthRange;

    return 'Invalid password. ' + validPasswordFormatMessage + '.';
}

function addUsernameErrors(username, validationErrors) {
    if (!username) {
        validationErrors.push({ message: 'Username is mandatory but was not specified.' });
    } else if (!checkUsernameFormat(username)) {
        validationErrors.push({ message: formatUsernameValidationError() });
    }
}

function addPasswordErrors(password, validationErrors) {
    if (!password) {
        validationErrors.push({ message: 'Password is mandatory but was not specified.' });
    } else if (!checkPasswordFormat(password)) {
        validationErrors.push({ message: formatPasswordValidationError() });
    }
}

function validateUser(user) {
    var validationErrors = [],
        error;

    if (!user) {
        validationErrors.push('No user data specified.');
    } else {
        addUsernameErrors(user.username, validationErrors);
        addPasswordErrors(user.password, validationErrors);
    }

    if (validationErrors.length > 0) {
        error = new Error(validationErrorMessage);
        error.name = 'VALIDATION_ERROR';
        error.errors = validationErrors;

        throw error;
    }

    return user;
}

function checkUsernameAvailability(username, usersCollection) {
    return Promise.resolve(usersCollection.count({ username: username })
        .then(function (count) {
            var error;

            if (count > 0) {
                error = new Error(validationErrorMessage);
                error.name = 'VALIDATION_ERROR';
                error.errors = [
                    { message: 'Username is already taken.' }
                ];

                throw error;
            }
        }));
}

function insertUser(user, usersCollection) {
    return mongo.insert(usersCollection, user);
}

function registerUser(req, res, next) {
    var user = req.body;

    Promise.try(validateUser.bind(null, user))
        .then(mongo.connect)
        .then(getUsersCollection)
        .tap(checkUsernameAvailability.bind(null, user.username))
        .then(insertUser.bind(null, user))
        .then(function (insertedUser) {
            res
                .location('/users/' + insertedUser.username)
                .status(201)
                .end();
        })
        .catch(next);
}

module.exports = {
    registerUser: registerUser
};
