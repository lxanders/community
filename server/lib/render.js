'use strict';

var serializeState = require('./serializeState'),
    Layout = require('../../shared/components/Layout.jsx'),
    React = require('react');

function renderToHtml(isomorphicApp) {
    var component = isomorphicApp.getComponent(),
        layoutComponent = React.createFactory(Layout);

    return React.renderToStaticMarkup(layoutComponent({
        content: React.renderToString(component()),
        serializedState: serializeState(isomorphicApp)
    }));
}

function renderOnServer(isomorphicApp, res) {
    var html = renderToHtml(isomorphicApp);

    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
}

module.exports = {
    renderToHtml: renderToHtml,
    renderOnServer: renderOnServer
};
