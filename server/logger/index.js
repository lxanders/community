'use strict';

var Winston = require('winston'),
    consoleLoggingConfiguration = {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
    logger = new Winston.Logger({
        transports: [
            new Winston.transports.Console(consoleLoggingConfiguration)
        ]
    });

function removeEndingNewLineCharacter(message) {
    var lastCharacter;

    if (message.length > 0) {
        lastCharacter = message[message.length-1];

        if (lastCharacter === '\n') {
            message = message.slice(0, -1);
        }
    }

    return message;
}

module.exports = logger;
module.exports.infoStream = {
    write: function (message) {
        logger.info(removeEndingNewLineCharacter(message));
    }
};
