'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    proxyquire = require('proxyquire'),
    mongo = require('../../../db/mongo');

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('mongo', function () {

    describe('connect', function () {

        describe('valid configuration', function () {

            var config = {
                    host: 'anyhost',
                    name: 'anyname'
                },
                monkStub,
                mongoWithMonkStub;

            it('should call the connection method with the right connection string', function () {
                monkStub = function (connectionString) {
                    expect(connectionString).to.equal(config.host + '/' + config.name);
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
                    dbConfig: {
                        host: 'any  host',
                        name: 'anyname'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: No whitespaces allowed: '},
                {
                    dbConfig: {
                        host: 'anyhost',
                        name: 'any  name'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: No whitespaces allowed: '
                },
                {
                    dbConfig: {
                        host: 42,
                        name: 'anyname'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Host and name have to be strings: '
                },
                {
                    dbConfig: {
                        host: 'anyname',
                        name: {}
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Host and name have to be strings: '
                },
                {
                    dbConfig: {
                        name: 'anyname'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    dbConfig: {
                        host: 'anyhost'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    dbConfig: {
                        host: '',
                        name: 'anyname'
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                },
                {
                    dbConfig: {
                        host: 'anyhost',
                        name: ''
                    },
                    errorMessageStaticPart: 'Invalid Database configuration: Missing or empty arguments: '
                }
            ];

            testCases.forEach(function (testCase) {
                var hostAndName = 'host=' + testCase.dbConfig.host + ', name=' + testCase.dbConfig.name;

                it('should throw an error for ' + hostAndName, function () {
                    var expectedErrorMessage,
                        dbConfigurationString = JSON.stringify(testCase.dbConfig),
                        connect = mongo.connect.bind(null, testCase.dbConfig);

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

    describe('checkIndexes', function () {

        var dbConfig = {
                    host: 'anyhost',
                    name: 'anyname'
            },
            monkStub,
            mongoWithMonkStub;

        it('should return without errors if the users username index did exist', function () {
            var validIndexes = {
                    '_id_': [
                        [ '_id', 1 ]
                    ],
                    'username_1': [
                        [ 'username', 1 ]
                    ]
                },
                indexesStub = sinon.stub().returns(validIndexes),
                getStub = sinon.stub().returns({
                    indexes: indexesStub
                });

            monkStub = sinon.stub().returns({
                get: getStub
            });

            mongoWithMonkStub = proxyquire('../../../db/mongo', { monk: monkStub });

            return mongoWithMonkStub.connect(dbConfig)
                .then(mongoWithMonkStub.checkIndexes)
                .then(function () {
                    expect(getStub).to.have.been.calledOnce;
                    expect(getStub).to.have.been.calledWith('users');
                    expect(indexesStub).to.have.been.calledOnce;
                });

        });

        it('should return a rejected promise with an error if the users username index does not exist', function () {
            var expectedErrorMessage = 'Username index missing in users collection',
                invalidIndexes = {},
                indexesStub = sinon.stub().returns(invalidIndexes),
                getStub = sinon.stub().returns({
                    indexes: indexesStub
                });

            monkStub = sinon.stub().returns({
                get: getStub
            });

            mongoWithMonkStub = proxyquire('../../../db/mongo', { monk: monkStub });

            return mongoWithMonkStub.connect(dbConfig)
                .then(function () {
                    return expect(mongoWithMonkStub.checkIndexes()).to.be.rejectedWith(expectedErrorMessage);
                });

        });

        it('should throw an error if the database is not yet connected', function () {
            expect(mongo.checkIndexes).to.throw('Database not (yet) connected');

        });

    });

});
