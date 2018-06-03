let gulp = require('gulp');
let paths = require('../paths');
let gutil = require('gulp-util');

// outputs changes to files to the console
let reportChange = event => {
    return gutil.log('File ' + event + ' was updated, running tasks...');
};

let watchDone = (done) => {
    done();
};

gulp.task('watch', gulp.series('build', (done) => {
    gulp.watch(paths.source, gulp.series('build-system', 'bundle-js', 'eslint-source', watchDone)).on('change', reportChange);
    gulp.watch(paths.html, gulp.series('copy-html', watchDone)).on('change', reportChange);
    gulp.watch(paths.css, gulp.series('copy-css', 'bundle-css', watchDone)).on('change', reportChange);
    gulp.watch(paths.watchLess, gulp.series('less', 'bundle-css', watchDone)).on('change', reportChange);
    //gulp.watch(paths.translations, gulp.series('translation', watchDone)).on('change', reportChange);
    gulp.watch(paths.images, gulp.series('copy-images', watchDone)).on('change', reportChange);
    gulp.watch(paths.buildScripts, gulp.series('eslint-build', watchDone)).on('change', reportChange);
    done();

    console.log('');
    console.log('------------------------');
    console.log('Gulp watch initialized.');
    console.log('------------------------');
    console.log('');
}));

