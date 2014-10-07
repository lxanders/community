'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    config = require('../../../config/config');

chai.use(sinonChai);

describe('config', function () {

    var configDirectory = '../../../config',
        getConfig = config.getConfig;

    describe('getConfig', function () {

        var requireFunctionStub,
            configurationContent = {};

        describe('existing configuration', function () {

            before(function () {
                sinon.spy(config, 'formatRelativeConfigFilePath');
                requireFunctionStub = sinon.stub().returns(configurationContent);
            });

            after(function () {
                config.formatRelativeConfigFilePath.restore();
            });

            afterEach(function () {
                config.formatRelativeConfigFilePath.reset();
                requireFunctionStub.reset();
            });

            it('should pass the correct argument', function () {
                var environment = 'any',
                    expectedResult = configurationContent;

                expect(getConfig(environment, configDirectory, requireFunctionStub)).to.deep.equal(expectedResult);

                expect(config.formatRelativeConfigFilePath).to.have.been.calledOnce;
                expect(config.formatRelativeConfigFilePath).to.have.been.calledWith(environment, configDirectory);

                expect(requireFunctionStub).to.have.been.calledOnce;
                expect(requireFunctionStub).to.have.been.calledWith(configDirectory + '/' + environment + '.json');
            });

        });

        describe('error cases', function () {

            var expectedError;

            before(function () {
                sinon.spy(config, 'formatRelativeConfigFilePath');
            });

            after(function () {
                config.formatRelativeConfigFilePath.restore();
            });

            afterEach(function () {
                config.formatRelativeConfigFilePath.reset();
                requireFunctionStub.reset();
            });

            describe('not existing configuration', function () {

                before(function () {
                    expectedError = new Error();
                    expectedError.code = 'MODULE_NOT_FOUND';
                    requireFunctionStub = sinon.stub().throws(expectedError);
                });

                it('should throw an error if the specified configuration does not exist', function () {
                    var environment = 'any not existing',
                        expectedErrorMessage = 'Config file for system environment not existing: ' + environment,
                        boundGetConfig = getConfig.bind(null, environment, configDirectory, requireFunctionStub);

                    expect(boundGetConfig).to.throw(expectedErrorMessage);
                });

            });

            describe('other errors', function () {

                before(function () {
                    expectedError = new Error('any error');
                    requireFunctionStub = sinon.stub().throws(expectedError);
                });

                it('should throw any unknown error', function () {
                    var environment = 'any not existing',
                        boundGetConfig = getConfig.bind(null, environment, configDirectory, requireFunctionStub);

                    expect(boundGetConfig).to.throw(expectedError);
                });

            });

        });

    });

    describe('formatRelativeConfigFilePath', function () {

        describe('valid string input', function () {

            it('should format the relative config file path from a specified environment', function () {
                var environment = 'any',
                    expectedPath = configDirectory + '/' + environment + '.json';

                expect(config.formatRelativeConfigFilePath(environment, configDirectory)).to.equal(expectedPath);
            });

        });

        describe('invalid input', function () {

            var testCases = [
                {},
                { input: null },
                { input: 42 },
                { input: [] },
                { input: {} }
            ];

            testCases.forEach(function (testCase) {
                it('should throw an error for invalid input: ' + testCase.input, function () {
                    var formatFunction = config.formatRelativeConfigFilePath,
                        expectedErrorMessage = 'Invalid environment name or config directory: Only strings are allowed';

                    formatFunction = formatFunction.bind(null, testCase.input, configDirectory);

                    expect(formatFunction).to.throw(expectedErrorMessage);
                });
            });

        });

    });

});
