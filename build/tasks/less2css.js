let gulp = require('gulp');
let less = require('gulp-less');
let paths = require('../paths');
let rename = require('gulp-rename');

gulp.task('less', () => {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(rename(path => {
            path.basename += '-less';
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('copy-css', () => {
    return gulp.src(paths.css)
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-css', gulp.parallel('less', 'copy-css'));
