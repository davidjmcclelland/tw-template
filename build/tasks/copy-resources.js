'use strict';
let gulp = require('gulp');
let paths = require('../paths');

gulp.task('copy-html', () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.package));
});

gulp.task('copy-images', () => {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.package));
});

gulp.task('copy-resources', gulp.series('copy-html', 'copy-images'));
