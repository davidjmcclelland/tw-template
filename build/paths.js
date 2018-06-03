let root = './';
let appRoot = 'src/';
let testRoot = 'test/';
let outputRoot = 'dist/';
let bundleRoot = 'package/';
let packageRoot = 'package/';
let translationRoot = 'locales/';

module.exports = {
    test:   testRoot,
    source: appRoot + '**/*.js',

    css:              appRoot + '**/*.css',
    less:             appRoot + '**/App*.less',
    watchLess:        appRoot + '**/*.less',
    html:             appRoot + '**/*.html',
    images:           [appRoot + '**/*.png', appRoot + '**/*.jpg', appRoot + '**/*.gif'],
    buildScripts:     root + 'build/**/*.js',
    output:           outputRoot,
    outputSourceMaps: root,
    package:          packageRoot,
    packageContents:  [packageRoot + 'Builder/*', packageRoot + 'Runtime/*', packageRoot + 'Common/*'],

    vendors: [root + 'vendors/**', '!' + root + 'vendors/**/*.js'],

    bundleOutput:     bundleRoot,
    bundleTestOutput: testRoot + 'package/',

    translations:           translationRoot + '**/*.json',
    translationSource:      translationRoot,
    translationOutput:      packageRoot + 'Builder/locales/',
    translationLoginOutput: packageRoot + 'Common/locales/',

    testSource: testRoot + 'unit/**/*.js',
    testOutput: testRoot + 'dist',
    unitTests:  testRoot + 'unit'
};
