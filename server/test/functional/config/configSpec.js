'use strict';

var expect = require('chai').expect,
    config = require('../../../config/config');

describe('config', function () {

    describe('getConfig', function () {

        var configDirectory = '../../../config/';

        describe('existing configuration', function () {

            var testCases = [
                { environment: 'development' },
                { environment: 'integration' },
                { environment: 'production' },
                { environment: 'test' }
            ];

            testCases.forEach(function (testCase) {
                it('should successfully load the specified configuration: ' + testCase.environment, function () {
                    expect(config.getConfig(testCase.environment, configDirectory, require)).to.be.defined;
                });
            });

        });

        describe('not existing configuration', function () {

            it('should throw an error if the specified configuration does not exist', function () {
                var environment = 'any not existing',
                    expectedErrorMessage = 'Config file for system environment not existing:', environment,
                    getConfig = config.getConfig;

                expect(getConfig.bind(null, environment, configDirectory, require)).to.throw(expectedErrorMessage);
            });

        });

    });

});
