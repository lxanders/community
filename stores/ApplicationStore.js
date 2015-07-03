'use strict';

var createStore = require('fluxible/addons').createStore,
    ApplicationStore;

ApplicationStore = createStore({
    storeName: 'ApplicationStore',

    handlers: {
        UPDATE_PAGE_TITLE: 'updatePageTitle'
    },

    initialize: function () {
        this.pageTitle = '';
    },

    updatePageTitle: function (title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    },

    getPageTitle: function () {
        return this.pageTitle;
    },

    getState: function () {
        return {
            pageTitle: this.pageTitle
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.pageTitle = state.pageTitle;
    }
});

module.exports = ApplicationStore;
