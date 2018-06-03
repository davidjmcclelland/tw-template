let gulp = require('gulp');
let gzip = require('gulp-gzip');
let tar = require('gulp-tar');
let fs = require('fs');
let paths = require('../paths');

let createTgz = () => {
    let appPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    let tgzName = appPackageJson.name + '-' + appPackageJson.version + '.tgz';
    console.log('pack: creating tgz file:', tgzName);
    return gulp.src(paths.package + '**', {base: '.'})
        .pipe(tar(tgzName))
        .pipe(gzip({append: false}))
        .pipe(gulp.dest('.'));

};

gulp.task('pack', createTgz);
