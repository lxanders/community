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

function renderToHtmlWithDoctype(isomorphicApp) {
    var html = renderToHtml(isomorphicApp);

    return '<!DOCTYPE html>' + html;
}

module.exports = {
    renderToHtml: renderToHtml,
    renderToHtmlWithDoctype: renderToHtmlWithDoctype
};
