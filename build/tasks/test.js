let gulp = require('gulp'),
    path = require('path'),
    paths = require('../paths'),
    twxFs = require('./twx-fs'),
    gutil = require('gulp-util');

require('./build');
require('./bundle');

let coverage = false;
let root = path.join(__dirname, '..', '..');

let Server = require('karma').Server;

let clean = () => {
    twxFs.cleanFolder(path.join(root, 'test', 'dist'));
    twxFs.cleanFolder(path.join(root, 'test', 'package'));
    if (coverage) {
        twxFs.deleteFolderRecursive(path.join(root, 'test', 'coverage'));
        twxFs.cleanFolder(path.join(root, 'test', 'junit-report'));
    }
};

gulp.task('run-unit-test', done => {
    let configFile = gutil.env.coverage ? 'karma.conf.cover.js' : 'karma.conf.js';
    let singleRun = !gutil.env.watch;
    new Server({
        configFile: path.join(__dirname, '..', '..', configFile),
        singleRun:  singleRun
    }).start();
    done();
});

let unitTestSetup = done => {
    clean();
    done();
};

let watchTests = done => {
    if (gutil.env.watch) {
        return gulp.watch(paths.testSource, gulp.series('build-test', 'bundle-test'));
    }
    return done();
};

let runUnitTests = () => {
    return gulp.series('build-test', 'bundle-test', 'spec-runner', 'run-unit-test', watchTests, done => {
        done();
    });
};

gulp.task('clean-test', gulp.series(unitTestSetup));

gulp.task('test', gulp.series(unitTestSetup, runUnitTests()));
