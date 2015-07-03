'use strict';

module.exports = {
    index: {
        path: '/',
        method: 'get',
        handler: require('../components/CommunityApp.jsx'),
        page: 'index',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Community - Index' });
            done();
        }
    }
};
