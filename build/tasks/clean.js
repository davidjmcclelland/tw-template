let gulp = require('gulp');
let paths = require('../paths');
let del = require('del');
let vinylPaths = require('vinyl-paths');

gulp.task('clean-dist', () => {
    return gulp.src(paths.output, {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task('clean-bundle', () => {
    return gulp.src(paths.packageContents, {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task('clean', gulp.series('clean-dist', 'clean-bundle'));
