'use strict';

var users = require('./api/users'),
    usersBasePath = '/users';

module.exports = function (router) {

    router.post(usersBasePath, users.registerUser);

};
