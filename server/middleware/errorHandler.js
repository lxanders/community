'use strict';

/* eslint no-unused-vars:0 */
// express requires exactly 4 parameters to determine if a middleware is an error middlewares
module.exports = function errorHandler(error, req, res, next) {
    var statusCode,
        defaultErrorHTTPStatusCode = 500,
        defaultErrorName = 'ERROR',
        defaultErrorMessage = 'Unexpected error.',
        response = {
            error: {
                name: error.name || defaultErrorName,
                message: error.message || defaultErrorMessage,
                errors: error.errors || []
            }
        };

    if (response.error.name === 'VALIDATION_ERROR') {
        statusCode = 400;
    } else {
        statusCode = defaultErrorHTTPStatusCode;
    }

    res
        .status(statusCode)
        .json(response);
};
