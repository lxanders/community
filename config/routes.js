'use strict';

module.exports = {
    index: {
        path: '/',
        method: 'get',
        page: 'index',
        label: 'Community - Index',
        action: function (context, payload, done) {
            done();
        }
    }
};
