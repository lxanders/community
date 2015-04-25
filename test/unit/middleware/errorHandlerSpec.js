'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    errorHandler = require('../../../server/middleware/errorHandler');

describe('errorHandler', function () {
    var req,
        res,
        next,
        defaultErrorStatusCode = 500;

    beforeEach(function () {
        req = {};

        res = { json: sinon.stub(), status: sinon.stub() };
        res.status.returns(res);

        next = sinon.spy();
    });

    it('should not call the "next" method', function () {
        errorHandler({}, req, res, next);

        expect(next).to.not.have.been.called;
    });

    it('should always respond with json', function () {
        errorHandler({}, req, res, next);

        expect(res.json).to.have.been.calledOnce;
    });

    describe('status', function () {
        var testCases = [
            { expectedStatus: defaultErrorStatusCode },
            { name: '', expectedStatus: defaultErrorStatusCode },
            { name: 'ERROR', expectedStatus: defaultErrorStatusCode },
            { name: 'VALIDATION_ERROR', expectedStatus: 400 }
        ];

        testCases.forEach(function (testCase) {
            it('should send the correct status code for error name=' + testCase.name, function () {
                var error = { name: testCase.name };

                errorHandler(error, req, res, next);

                expect(res.status).to.have.been.calledWith(testCase.expectedStatus);
            });
        });
    });

    describe('error format', function () {
        var testCases = [
            {
                error: {},
                expectedStatusCode: 500,
                expectedResponse: {
                    error: {
                        name: 'ERROR',
                        message: 'Unexpected error.',
                        errors: []
                    }
                },
                description: 'if error name, message and errors are missing'
            },
            {
                error: {
                    errors: [ 'anyError', 'anyOtherError' ]
                },
                expectedStatusCode: 500,
                expectedResponse: {
                    error: {
                        name: 'ERROR',
                        message: 'Unexpected error.',
                        errors: [ 'anyError', 'anyOtherError' ]
                    }
                },
                description: 'if message and name are missing'
            },
            {
                error: {
                    name: 'VALIDATION_ERROR'
                },
                expectedStatusCode: 400,
                expectedResponse: {
                    error: {
                        name: 'VALIDATION_ERROR',
                        message: 'Unexpected error.',
                        errors: []
                    }
                },
                description: ' if message and errors are missing'
            },
            {
                error: {
                    name: 'VALIDATION_ERROR',
                    message: 'anyMessage',
                    errors: [ 'any', 'error' ]
                },
                expectedStatusCode: 400,
                expectedResponse: {
                    error: {
                        name: 'VALIDATION_ERROR',
                        message: 'anyMessage',
                        errors: [ 'any', 'error' ]
                    }
                },
                description: ' if name, message and errors are provided'
            }
        ];

        testCases.forEach(function (testCase) {
            it('should format an standard conform error message ' + testCase.description, function () {
                errorHandler(testCase.error, req, res, next);

                expect(res.status).to.have.been.calledWithExactly(testCase.expectedStatusCode);
                expect(res.json).to.have.been.calledWithExactly(testCase.expectedResponse);
            });
        });
    });
});
