'use strict';

var createStore = require('fluxible/addons').createStore,
    ApplicationStore;

function isEqualRoute(currentRoute, route) {
    if (currentRoute && route) {
        return currentRoute.path === route.path
    }

    return false;
}

ApplicationStore = createStore({
    storeName: 'ApplicationStore',

    handlers: {
        CHANGE_ROUTE: 'handleNavigate'
    },

    initialize: function () {
        this.currentRoute = null;
    },

    handleNavigate: function (route) {
        if (!isEqualRoute(this.currentRoute, route) || !this.currentRoute) {
            this.currentRoute = route;

            this.emitChange();
        }
    },

    getState: function () {
        return {
            route: this.currentRoute
        };
    },

    dehydrate: function () {
        return this.getState();
    },

    rehydrate: function (state) {
        this.currentRoute = state.route;
    }
});

module.exports = ApplicationStore;
