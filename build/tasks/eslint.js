let gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    paths = require('../paths'),
    gutil = require('gulp-util'),
    changed = require('gulp-changed');

let failOnError = false;

let eslintRunner = function(src) {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.results(results => {
            if (results.errorCount) {
                gutil.beep();
                if (failOnError) {
                    process.exit(1); // for jenkins eslint.failAfterError didn't work.
                }
            } else {
                console.log('No errors in build scripts!');
            }
        }));
};

gulp.task('eslint-build', () => {
    return eslintRunner(paths.buildScripts);
});

gulp.task('eslint-source', () => {
    return eslintRunner(paths.source);
});

gulp.task('eslint-test', () => {
    return eslintRunner(paths.testSource);
});

gulp.task('eslint-source-changed', () => {
    return gulp.src(paths.source)
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.results(results => {
            if (results.errorCount) {
                gutil.beep();
            } else {
                console.log('No errors in source!');
            }
        }));
});

gulp.task('eslint', gulp.parallel('eslint-source', 'eslint-build'));

gulp.task('eslint-with-err', (done) => {
    failOnError = true;
    return gulp.parallel('eslint-source', 'eslint-build', 'eslint-test', (done2) => {
        done2();
        done();
    })();
});
