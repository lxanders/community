'use strict';

function getStatusCodeForError(errorName) {
    var defaultErrorHTTPStatusCode = 500,
        statusCode;

    if (errorName === 'VALIDATION_ERROR') {
        statusCode = 400;
    } else {
        statusCode = defaultErrorHTTPStatusCode;
    }

    return statusCode;
}

/* eslint no-unused-vars:0 */
// express requires exactly 4 parameters to determine if a middleware is an error middlewares
module.exports = function errorHandler(error, req, res, next) {
    var defaultErrorName = 'ERROR',
        defaultErrorMessage = 'Unexpected error.',
        response = {
            error: {
                name: error.name || defaultErrorName,
                message: error.message || defaultErrorMessage,
                errors: error.errors || []
            }
        };

    res
        .status(getStatusCodeForError(response.error.name))
        .json(response);
};
