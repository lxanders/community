'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    serializeState = require('../../../server/lib/serializeState');

describe('serializeState', function () {
    var isomorphicApp,
        serializedState,
        context;

    beforeEach(function () {
        isomorphicApp = {
            dehydrate: sinon.stub(),
            createContext: sinon.stub().returns(context)
        };
    });

    it('should return the serialized state for an empty dehydrated state', function () {
        var dehydratedState = {},
            expectedSerializedState = '{}';

        isomorphicApp.dehydrate.returns(dehydratedState);

        serializedState = serializeState(isomorphicApp);

        expect(serializedState).to.equal(expectedSerializedState);
    });

    it('should return the serialized state for a simple dehydrated state', function () {
        var dehydratedState = { foo: 'bar' },
            expectedSerializedState = '{"foo":"bar"}';

        isomorphicApp.dehydrate.returns(dehydratedState);

        serializedState = serializeState(isomorphicApp);

        expect(serializedState).to.equal(expectedSerializedState);
    });

    it('should return the serialized state for a complex dehydrated state', function () {
        var dehydratedState,
            expectedSerializedState = '{"any":function any(arg) { return arg * 2; },"nested":{"foo":"bar"}}';

        /* eslint-disable */
        dehydratedState = {
            any: function any (arg) { return arg * 2; },
            nested: { foo: 'bar' }
        };
        /* eslint-disable */

        isomorphicApp.dehydrate.returns(dehydratedState);

        serializedState = serializeState(isomorphicApp);

        expect(serializedState).to.equal(expectedSerializedState);
    });
});
