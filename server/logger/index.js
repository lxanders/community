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
        lastCharacter = message[message.length - 1];

        while(lastCharacter === '\n') {
            message = message.slice(0, -1);

            if(message.length > 0) {
                lastCharacter = message[message.length - 1];
            } else {
                break;
            }
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
