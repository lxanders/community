'use strict';

var expect = require('chai').expect,
    TestUtils = require('react/addons').addons.TestUtils,
    Fluxible = require('fluxible'),
    CommunityApp = require('../../../shared/components/CommunityApp.jsx'),
    createIsomorphicApp = require('../../../shared/IsomorphicApp').createIsomorphicApp;

describe('isomorphicApp', function () {
    var app;

    beforeEach(function () {
        app = createIsomorphicApp();
    });

    describe('createIsomorphicApp', function () {
        it('should export an instance of Fluxible', function () {
            expect(app).to.be.an.instanceOf(Fluxible);
        });

        it('should configure the main application component as a factory', function () {
            var componentFactory = app.getAppComponent();

            expect(TestUtils.isElementOfType(componentFactory(), CommunityApp)).to.be.true;
        });
    });
});
