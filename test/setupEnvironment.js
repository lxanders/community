'use strict';

var jsdom = require('jsdom'),
    chai = require('chai');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
