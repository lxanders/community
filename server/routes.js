'use strict';

var users = require('./api/users');

module.exports = function (app) {

    app.post('/users', users.registerUser);

};
