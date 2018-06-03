let colors = require('ansi-colors');
let fs = require('fs');
let gulp = require('gulp');
let log = require('fancy-log');
let mkdirp = require('mkdirp');
let path = require('path');
let paths = require('../paths');
let reduce = require('gulp-reduce-file');
let removeEmptyLines = require('gulp-remove-empty-lines');
let stripJsonComments = require('gulp-strip-json-comments');
let _ = require('lodash');

function createDirectory(dir) {
    mkdirp(dir, err => {
        if (err) {
            console.error(err);
        }
    });
}

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(file => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function performTranslationTask(filename, srcRoot, outRoot, done) {
    let stream = null;
    let folders = getFolders(srcRoot);

    let collectFn = (file, accum) => {
        // convert stream to string
        let contents = file.contents.toString('utf8');
        // put the contents into accum with the key of the path
        try {
            accum[file.path] = JSON.parse(contents);
        } catch (err) {
            log(colors.red(colors.bold(err)) + ' in file: ' + colors.cyan(file.path));
            throw new Error(err + ' in file: ' + file.path);
        }
        return accum;
    };

    let finalizeFn = obj => {
        let translations = {};
        _.values(obj).reverse().forEach(val => {
            _.merge(translations, val);
        });
        return translations;
    };

    folders.map(folder => {
        stream = gulp.src(path.join(srcRoot, folder, '/**/*.json'))
            .pipe(stripJsonComments())
            .pipe(removeEmptyLines())
            .pipe(reduce(filename, collectFn, finalizeFn, {}))
            .pipe(gulp.dest(outRoot + folder));
    });

    stream.on('end', () => {
        done();
    });
}

gulp.task('translation-mashup-builder', (done) => {
    return performTranslationTask('translation-mashup-builder.json', paths.translationSource + 'mashup-builder/', paths.translationOutput, done);
});

gulp.task('translation-login', (done) => {
    return performTranslationTask('translation-login.json', paths.translationSource + 'login/', paths.translationLoginOutput, done);
});

gulp.task('translation', (done) => {
    createDirectory(paths.translationOutput);
    return gulp.parallel('translation-mashup-builder', 'translation-login', (done2) => {
        done2();
        done();
    })();
});
