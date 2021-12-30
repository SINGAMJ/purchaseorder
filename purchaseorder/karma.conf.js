module.exports = function (config) {
    config.set({
        frameworks: ["ui5"],

        ui5: {
            failOnEmptyTestPage: true
        },

        browsers: ["ChromeHeadless"],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            'webapp/Component.js': ['coverage'],
            'webapp/!(test)/*.js': ['coverage']
            
        },
        coverageReporter: { type: 'lcov', dir: 'coverage/' },
        browserNoActivityTimeout: 900000,
        pingTimeout: 20000
    });

    require("karma-ui5/helper").configureIframeCoverage(config);
};