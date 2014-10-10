'use strict';

var Promise = require('bluebird'),
    expect = require('chai').expect,
    supertestAsPromised = require('supertest-as-promised'),
    server = require('../../../server'),
    mongo = require('../../../db/mongo');

describe('Users API', function () {
    var db,
        usersCollection,
        environment = process.env.NODE_ENV,
        getConfig = require('../../../config/config').getConfig,
        configPath = '../../../config',
        config = getConfig(environment, configPath, require),
        request;

    before(function () {
        request = supertestAsPromised(server);

        return mongo.connect(config)
            .then(function (database) {
                db = database;
                usersCollection = db.get('users');

                return Promise.resolve(usersCollection.remove({}));
            });
    });

    describe('users', function () {

        describe('POST - register user', function () {

            afterEach(function () {
                return Promise.resolve(usersCollection.remove({}));
            });

            describe('valid input', function () {

                var testUsers = [
                        {
                            username: 'anyUsername',
                            password: 'anyPassword'
                        },
                        {
                            username: 'any_Usern4me',
                            password: 'anyPassword'
                        },
                        {
                            username: 'anyUsername',
                            password: 'any   Password'
                        },
                        {
                            username: 'anyUsername',
                            password: '\\a/n!y  []{}<> P$as_swo-rd%'
                        }
                    ],
                    usernameAndPassword;

                testUsers.forEach(function (testUser) {
                    usernameAndPassword = 'username=' + testUser.username + ', password=' + testUser.password;

                    it('should add a user for ' + usernameAndPassword, function () {
                        return Promise.resolve(usersCollection.findOne({ username: testUser.username }))
                            .then(function (user) {
                                expect(user).to.not.exist;

                                return request
                                    .post('/users')
                                    .send(testUser)
                                    .expect(201)
                                    .then(function (result) {
                                        expect(result.headers).to.have.property('location');
                                        expect(result.headers.location).to.equal('/users/' + testUser.username);

                                        return Promise.resolve(usersCollection.findOne({ username: testUser.username }))
                                            .then(function (foundUser) {
                                                expect(foundUser).to.have.property('username');
                                                expect(foundUser).to.have.property('password');
                                                expect(foundUser.username).to.equal(testUser.username);
                                                expect(foundUser.password).to.equal(testUser.password);
                                            });
                                    });
                            });
                    });
                });

            });


            describe('invalid input', function () {

                var usernameMissingErrorMessage = 'Username is mandatory but was not specified.',
                    passwordMissingErrorMessage = 'Password is mandatory but was not specified.',
                    invalidUsernameErrorMessage = 'Invalid username. Valid input: Alphanumerical ascii compliant ' +
                        'characters (a-z, A-Z, 0-9, _, no whitespaces), length between 4-40.',
                    invalidPasswordErrorMessage = 'Invalid password. Valid input: Password length between 6-60.',
                    testCases = [
                        {
                            user: {
                                password: '12345678'
                            },
                            expectedErrors: [
                                { message: usernameMissingErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'anyUsername'
                            },
                            expectedErrors: [
                                { message: passwordMissingErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'anyUsername',
                                password: 12345678
                            },
                            expectedErrors: [
                                { message: invalidPasswordErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: {},
                                password: 'anyPassword'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'any',
                                password: 'anyPassword'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'anyUsernameAnyUsernameAnyUsernameAnyUsername',
                                password: 'anyPassword'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'anyUsername',
                                password: 'anyPasswordanyPasswordanyPasswordanyPasswordanyPasswordanyPassword'
                            },
                            expectedErrors: [
                                { message: invalidPasswordErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'any Username',
                                password: 'anyPassword'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'any$Username',
                                password: 'anyPassword'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'anyUsername!',
                                password: 'anyPassword'
                            },

                            expectedErrors: [
                                { message: invalidUsernameErrorMessage }
                            ]
                        },
                        {
                            user: {
                                username: 'any',
                                password: 'user'
                            },
                            expectedErrors: [
                                { message: invalidUsernameErrorMessage },
                                { message: invalidPasswordErrorMessage }
                            ]
                        }
                    ],
                    usernameAndPassword;

                afterEach(function () {
                    return Promise.resolve(usersCollection.remove({}));
                });

                testCases.forEach(function (testCase) {
                    usernameAndPassword = 'username=' + testCase.user.username + ', password=' + testCase.user.password;

                    it('should throw an error for ' + usernameAndPassword, function () {
                        var expectedErrorResponse = {
                            error: {
                                name: 'VALIDATION_ERROR',
                                message: 'Validation error(s).',
                                errors: testCase.expectedErrors
                            }
                        };

                        return request
                            .post('/users')
                            .send(testCase.user)
                            .expect(400)
                            .then(function (result) {
                                expect(result.body).to.deep.equal(expectedErrorResponse);
                            });
                    });
                });

                it('should throw an error if the username is already taken', function () {
                    var testUser = {
                            username: 'anyUsername',
                            password: 'anyPassword'
                        },
                        expectedErrorResponse = {
                            error: {
                                name: 'VALIDATION_ERROR',
                                message: 'Validation error(s).',
                                errors: [ { message: 'Username is already taken.' } ]
                            }
                        };

                    return request
                        .post('/users')
                        .send(testUser)
                        .expect(201)
                        .then(function () {
                            return Promise.resolve(usersCollection.findOne(null, { username: testUser.username }))
                                .then(function (foundUser) {
                                    expect(foundUser).to.exist;
                                    expect(foundUser).to.have.property('username');
                                    expect(foundUser).to.have.property('password');
                                    expect(foundUser.username).to.equal(testUser.username);
                                    expect(foundUser.password).to.equal(testUser.password);
                                })
                                .then(function () {
                                    return request
                                        .post('/users')
                                        .send(testUser)
                                        .expect(400)
                                        .then(function (result) {
                                            expect(result.body).to.deep.equal(expectedErrorResponse);
                                        })
                                });
                        });

                });

            });

        });

    });

});
