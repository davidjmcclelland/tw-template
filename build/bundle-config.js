let paths = require('./paths');

let bundleConfig = {

    js: {
        bundles: [
            {
                name:       'mashup-common-general-builder.js',
                outDir:     paths.bundleOutput + 'Builder/',
                sourcemaps: true,
                include:    [
                    'dist/Common/**/*.js',
                    '!dist/Common/squeal/**/*.js',
                ]
            },
            {
                name:       'mashup-common-general-runtime.js',
                outDir:     paths.bundleOutput + 'Runtime/',
                sourcemaps: true,
                include:    [
                    'dist/Common/**/*.js',
                ]
            },
            {
                name:       'mashup-common-widgets-builder.js',
                outDir:     paths.bundleOutput + 'Builder/',
                sourcemaps: true,
                include:    [
                    'dist/Common/thingworx/widgets/twcore/*.js',
                    //'dist/Common/thingworx/widgets/**/*ide.js',
                ]
            },
            {
                name:       'mashup-common-widgets-runtime.js',
                outDir:     paths.bundleOutput + 'Runtime/',
                sourcemaps: true,
                include:    [
                    'vendors/placeholder/placeholderForBuilds.js'
                ]
            },
            {
                name:       'mashup-builder.js',
                outDir:     paths.bundleOutput + 'Builder/',
                sourcemaps: true,
                include:    [
                    //'dist/Builder/**/*.js',
                    'dist/Builder/js/*.js',
                ]
            },
            {
                name:       'mashup-runtime.js',
                outDir:     paths.bundleOutput + 'Runtime/',
                sourcemaps: true,
                include:    [
                    //'dist/Runtime/**/*.js',
                    'dist/Runtime/js/*.js',
                ]
            }
        ]
    },
    css: {
        bundles: [
            {
                name:    'mashup-builder.css',
                outDir:  paths.bundleOutput + 'Builder/css/',
                include: [
                    'dist/Builder/css/_placeholder_for_builds.css'
                ]
            },
            {
                name:    'mashup-runtime.css',
                outDir:  paths.bundleOutput + 'Runtime/css/',
                include: [
                    'dist/Runtime/css/_placeholder_for_builds.css'
                ]
            },
        ]
    },
    testJs: {
        bundles: [
            {
                name:    'mashup-test-0-vendor-bundle.js',
                outDir:  paths.bundleTestOutput,
                include: [
                    'vendors/placeholder/placeholderForBuilds.js'
                ]
            }
        ]
    }

};

module.exports = bundleConfig;
