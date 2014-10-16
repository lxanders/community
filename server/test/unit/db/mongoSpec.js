'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    proxyquire = require('proxyquire'),
    mongo = require('../../../db/mongo');

chai.use(sinonChai);

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

            it('should return an already initialized db object regardless of the input parameters', function () {
                var anyDb = { any: 'db' };

                monkStub = sinon.stub().returns(anyDb);

                mongoWithMonkStub = proxyquire('../../../db/mongo', { monk: monkStub });

                return mongoWithMonkStub.connect(config)
                    .then(mongoWithMonkStub.connect)
                    .then(function (db) {
                        expect(db).to.deep.equal(anyDb);
                        expect(monkStub).to.have.been.calledOnce;
                    });
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
                            name: 'anyname'
                        }
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    config: {
                        db: {
                            host: 'anyhost'
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

    describe('insert', function () {

        describe('valid arguments', function () {

            var collection = { insert: sinon.stub() },
                document = { some: 'content' };

            it('should call insert on the collection with the correct document', function () {
                return mongo.insert(collection, document)
                    .then(function () {
                        expect(collection.insert).to.have.been.calledOnce;
                        expect(collection.insert).to.have.been.calledWith(document);
                    });
            });
        });

        describe('invalid arguments', function () {

            var testCases = [
                    { document: {} },
                    { collection: {} }
                ],
                expectedErrorMessage = 'Invalid arguments: Collection or document missing';

            testCases.forEach(function (testCase) {
                it('should throw an error if one or both arguments are missing', function () {
                    var collection = testCase.collection,
                        document = testCase.document;

                    expect(mongo.insert.bind(null, collection, document)).to.throw(expectedErrorMessage);
                });
            });

        });

    });

    describe('indexes', function () {

        it('should return the currently configured indexes', function () {
            var collection = { indexes: sinon.stub() };

            mongo.indexes(collection);

            expect(collection.indexes).to.have.been.calledOnce;
        });

        it('should throw an error if no collection was specified', function () {
            expect(mongo.indexes).to.throw('Database not (yet) connected');
        });

        it('should throw an error if the provided collection is not a valid db collection', function () {
            var expectedErrorMessage = 'Specified collection is not a valid database collection ' +
                '(indexes function is not defined)';

            expect(mongo.indexes.bind(null, {})).to.throw(expectedErrorMessage);
        });

    });

});
