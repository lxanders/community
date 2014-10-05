'use strict';

var Promise = require('bluebird'),
    expect = require('chai').expect,
    request = require('supertest-as-promised'),
    server = require('../../../server'),
    mongo = require('../../../db/mongo');

describe('Users API', function () {
    var db,
        usersCollection,
        environment = process.env.NODE_ENV,
        getConfig = require('../../../config/config').getConfig,
        configPath = '../../../config',
        config = getConfig(environment, configPath, require);

    before(function () {
        return mongo.connect(config)
            .then(function (database) {
                db = database;
                usersCollection = db.get('users');

                return Promise.resolve(usersCollection.remove({}));
            })
    });

    describe('users', function () {

        var testuser = {
            username: 'anyone',
            password: 123
        };

        describe('POST - register user', function () {

            afterEach(function () {
                return Promise.resolve(usersCollection.remove({}));
            });

            it('should add a user', function () {
                return Promise.resolve(usersCollection.findOne({ username: testuser.username }))
                    .then(function (user) {
                        expect(user).to.not.exist;

                        return request(server)
                            .post('/users')
                            .send(testuser)
                            .expect(201)
                            .then(function (result) {
                                expect(result.headers).to.have.property('location');
                                expect(result.headers.location).to.equal('/users/' + testuser.username);
                            })
                    });
            });

        });

    });

});
