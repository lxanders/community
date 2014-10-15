'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    logger = require('../../../logger');

chai.use(sinonChai);

describe('logger', function () {

    describe('infoStream', function () {

        var infoStream = logger.infoStream,
            messageWithInnerLinebreaks = '\nany message containing \n \n line breaks';

        beforeEach(function () {
            logger.info = sinon.stub();
        });

        it('should remove any new line characters at the end', function () {
            var message = messageWithInnerLinebreaks + '\n\n\n';

            infoStream.write(message);

            expect(logger.info).to.have.been.calledOnce;
            expect(logger.info).to.have.been.calledWith(messageWithInnerLinebreaks);
        });

        it('should not remove new line characters in the message string if not at the end', function () {
            infoStream.write(messageWithInnerLinebreaks);

            expect(logger.info).to.have.been.calledOnce;
            expect(logger.info).to.have.been.calledWith(messageWithInnerLinebreaks);
        });

        it('should return without errors if the message is empty', function () {
            infoStream.write('');

            expect(logger.info).to.have.been.calledOnce;
            expect(logger.info).to.have.been.calledWith('');
        });

        it('should stop removing characters when none are left anymore', function () {
            infoStream.write('\n');

            expect(logger.info).to.have.been.calledOnce;
            expect(logger.info).to.have.been.calledWith('');
        });

    });

});
