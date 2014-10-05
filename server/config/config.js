'use strict';

module.exports = {

    formatRelativeConfigFilePath: function formatRelativeConfigFilePath(environment, configDirectory) {
        var isValidEnvironmentString = environment && typeof environment === 'string',
            isValidConfigDirectoryPath = configDirectory && typeof configDirectory === 'string';

        if (!isValidEnvironmentString || !isValidConfigDirectoryPath) {
            throw new Error('Invalid environment name or config directory: Only strings are allowed');
        }

        return configDirectory + '/' + environment + '.json';
    },

    getConfig: function getConfig(environment, configDirectory, requireFunction) {
        var relativeConfigFilePath = module.exports.formatRelativeConfigFilePath(environment, configDirectory),
            configFile,
            errorMessageStaticPart,
            requireModuleNotFoundErrorCode = 'MODULE_NOT_FOUND';

        try {
            configFile = requireFunction(relativeConfigFilePath);
        } catch (error) {
            if (error.code === requireModuleNotFoundErrorCode) {
                errorMessageStaticPart = 'Config file for system environment not existing: ';

                throw new Error(errorMessageStaticPart + environment + ' in ' + configDirectory);
            } else {
                throw error;
            }
        }

        return configFile;
    }

};
