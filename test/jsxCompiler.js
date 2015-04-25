'use strict';

var fs = require('fs'),
    ReactTools = require('react-tools');

if (!require.extensions.hasOwnProperty('.jsx')) {
    require.extensions['.jsx'] = function (module, filename) {
        var content,
            compiledContent;

        /* eslint-disable no-sync */
        content = fs.readFileSync(filename, 'utf8');
        /* eslint-enable no-sync */

        compiledContent = ReactTools.transform(content);

        /* eslint-disable no-underscore-dangle */
        return module._compile(compiledContent, filename);
        /* eslint-ensable no-underscore-dangle */
    };
}
