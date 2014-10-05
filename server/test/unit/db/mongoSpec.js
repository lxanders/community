'use strict';

var chai = require('chai'),
    expect = chai.expect,
    proxyquire = require('proxyquire'),
    config = require('../../../config/config'),
    mongo = require('../../../db/mongo');

describe('mongo', function () {

    describe('connect', function () {

        describe('valid configuration', function () {

            var config = {
                    db: {
                        host: 'anyhost',
                        name: 'anyname'
                    }
                },
                monkStub,
                mongoWithMonkStub;

            it('should call the connection method with the right connection string', function () {
                monkStub = function (connectionString) {
                    expect(connectionString).to.equal(config.db.host + '/' + config.db.name);
                };

                mongoWithMonkStub = proxyquire('../../../db/mongo', { monk: monkStub });

                mongoWithMonkStub.connect(config);
            });

        });

        describe('invalid configuration', function () {

            var testCases = [
                {
                    config: {
                        db: {
                            host: 'any  host',
                            name: 'anyname' }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: No whitespaces allowed: '},
                {
                    config: {
                        db: {
                            host: 'anyhost',
                            name: 'any  name' }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: No whitespaces allowed: '
                },
                {
                    config: {
                        db: {
                            host: 42,
                            name: 'anyname'
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Host and name have to be strings: '
                },
                {
                    config: {
                        db: {
                            host: 'anyname',
                            name: {}
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Host and name have to be strings: '
                },
                {
                    config: {
                        db: {
                            host: undefined,
                            name: 'anyname'
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    config: {
                        db: {
                            host: 'anyhost',
                            name: undefined
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    config: {
                        db: {
                            host: '',
                            name: 'anyname'
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    config: {
                        db: {
                            host: 'anyhost',
                            name: ''
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                }
            ];

            testCases.forEach(function (testCase) {
                var hostAndName = 'host=' + testCase.config.db.host + ', name=' + testCase.config.db.name;

                it('should throw an error for ' + hostAndName, function () {
                    var expectedErrorMessage,
                        dbConfigurationString = JSON.stringify(testCase.config.db),
                        connect = mongo.connect.bind(null, testCase.config);

                    expectedErrorMessage = testCase.errorMessageStaticPart + dbConfigurationString;

                    expect(connect).to.throw(expectedErrorMessage);
                });

            });

        });

    });

});
