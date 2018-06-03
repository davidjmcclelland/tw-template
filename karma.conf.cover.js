'use strict';
// let isWin = /^winxx/.test(process.platform);
// let browser = isWin ? 'Chrome' : 'PhantomJS';
let browser = 'Chrome';
console.log('Karma using browser launcher: ', browser);

let testFiles = [
    {pattern: 'test/dist/**/*.js', included: true}
];
let srcfiles = [
    {pattern: 'test/package/mashup-test-*.js', included: true}
];
let files = [].concat(srcfiles).concat(testFiles);
// console.log('karma.conf.js', files);

module.exports = function(config) {
    config.set({
        basePath:   '',
        frameworks: ['jasmine'],
        files:      files,
        exclude:    [],

        remapIstanbulReporter: {
            reports: {
                html: 'test/coverage/mapped'
            }
        },

        preprocessors: {
            'test/package/mashup-test-!(0|1)-*.js': ['coverage']
        },

        coverageReporter: {
            type: 'html',
            dir:  'test/coverage/bundled'
        },

        junitReporter: {
            outputDir: 'test/junit-report/'
        },

        reporters: ['progress', 'junit', 'coverage', 'karma-remap-istanbul'],
        port:      9876,
        colors:    true,
        logLevel:  config.LOG_INFO,
        autoWatch: true,

        browsers:  [browser],
        singleRun: false
    });
};
