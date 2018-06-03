let gulp = require('gulp');
let concat = require('gulp-concat');
let concatCss = require('gulp-concat-css');
let sourcemaps = require('gulp-sourcemaps');

let bundleConfig = require('../bundle-config');

bundleConfig.js.bundles.forEach((config) => {
    let taskName = 'bundle:js:' + config.name;
    gulp.task(taskName, () => {
        if (config.sourcemaps) {
            return gulp.src(config.include)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(concat(config.name))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(config.outDir));
        }
        return gulp.src(config.include)
            .pipe(concat(config.name))
            .pipe(gulp.dest(config.outDir));
    });
});

bundleConfig.css.bundles.forEach((config) => {
    let taskName = 'bundle:css:' + config.name;
    gulp.task(taskName, () => {
        if (config.sourcemaps) {
            return gulp.src(config.include)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(concatCss(config.name))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(config.outDir));
        }
        return gulp.src(config.include)
            .pipe(concatCss(config.name))
            .pipe(gulp.dest(config.outDir));
    });
});

gulp.task('bundle-js',
    gulp.parallel(
        bundleConfig.js.bundles.map((config) => {
            return 'bundle:js:' + config.name;
        })
    )
);

gulp.task('bundle-css',
    gulp.parallel(
        bundleConfig.css.bundles.map((config) => {
            return 'bundle:css:' + config.name;
        })
    )
);

gulp.task('bundle', gulp.parallel('bundle-js', 'bundle-css'));

bundleConfig.testJs.bundles.forEach((config) => {
    let taskName = 'bundle:testJs:' + config.name;
    gulp.task(taskName, () => {
        if (config.sourcemaps) {
            return gulp.src(config.include)
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(concat(config.name))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(config.outDir));
        }
        return gulp.src(config.include)
            .pipe(concat(config.name))
            .pipe(gulp.dest(config.outDir));
    });
});

gulp.task('bundle-test-js',
    gulp.parallel(
        bundleConfig.testJs.bundles.map((config) => {
            return 'bundle:testJs:' + config.name;
        })
    )
);

gulp.task('bundle-test', gulp.parallel('bundle-test-js'));

