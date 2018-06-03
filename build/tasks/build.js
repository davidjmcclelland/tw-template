let gulp = require('gulp');
let notify = require('gulp-notify');
let changed = require('gulp-changed');
let plumber = require('gulp-plumber');
let to5 = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');
let compilerOptions = require('../babel-options');
let assign = Object.assign || require('object.assign');
let paths = require('../paths');

require('./clean');
require('./eslint');
require('./bundle');
require('./copy-resources');
require('./translation');
require('./less2css');

let compOpts = compilerOptions.es2015();

// transpiles changed es6 files to AMD format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', () => {
    return gulp.src(paths.source)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, compOpts)))
        .pipe(sourcemaps.write(paths.outputSourceMaps))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-unit-test', () => {
    return gulp.src(paths.testSource)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.testOutput, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, compOpts)))
        .pipe(sourcemaps.write(paths.outputSourceMaps))
        .pipe(gulp.dest(paths.testOutput));
});

gulp.task('build-app', gulp.series(
    'clean',
    gulp.parallel(
        'build-system',
        'build-css',
        'translation',
        'copy-resources'
    ),
    'bundle'
));

gulp.task('build', gulp.series('build-app', 'eslint'));

gulp.task('build-test', gulp.series('build-unit-test'));
