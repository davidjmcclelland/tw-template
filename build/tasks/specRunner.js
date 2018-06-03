let gulp = require('gulp');
let fs = require('fs');
let glob = require('glob');
let _ = require('lodash');
let path = require('path');

let bundleConfig = require('../bundle-config');

function normalizeWinPath(dirpath) {
    return dirpath.split('\\').join('/');
}

function normalizePath(spec, basePath) {
    let normalizedPath = normalizeWinPath(spec.replace(basePath, ''));
    return normalizedPath.length > 1 && normalizedPath[0] === '/'
        ? normalizedPath.substring(1)
        : normalizedPath;
}

function createTestImportsScript(specs) {
    let s = '';
    for (let i = 0; i < specs.length; i++) {
        s += '<script type="text/javascript" src="' + normalizeWinPath(specs[i]) + '"></script>\n    ';
    }
    return s;
}

function createBundleScript(bundles) {
    let s = '';
    for (let i = 0; i < bundles.length; i++) {
        let fn = path.join(bundles[i].outDir, bundles[i].name);
        s += '<script type="text/javascript" src="' + normalizeWinPath(fn) + '"></script>\n    ';
    }
    return s;
}

function getBundles() {
    return bundleConfig.testJs.bundles;
}

let resolveFiles = function(root, globstr) {
    let basePath = normalizeWinPath(path.resolve(root));

    let globResults = glob.sync(path.resolve(root, globstr));
    let files = [];
    for (let i = 0; i < globResults.length; i++) {
        files.push(normalizePath(globResults[i], basePath));
    }
    return files;
};

let jasmineSpecRunnerReporter = (done) => {
    let root = path.join('.');
    let outputFile = normalizeWinPath(path.resolve(root, 'jasmine-spec-runner.html'));

    let bundles = getBundles();
    let testFiles = resolveFiles(root, 'test/dist/**/*.js');

    let tpl = _.template(fs.readFileSync(path.join(__dirname, '/spec-runner-template.html'), 'utf-8'));
    let output = tpl({
        jasmineCore: 'node_modules/jasmine-core/lib/jasmine-core',
        bundles:     createBundleScript(bundles),
        testImports: createTestImportsScript(testFiles)
    });

    fs.writeFile(outputFile, output, err => {
        if (err) {
            console.log('Jasmine Spec Runner could not be generated\n\t' + err.message);
        }
    });
    done();
};

gulp.task('spec-runner', (done) => {
    console.log('Running twx-spec-runner');
    return jasmineSpecRunnerReporter(done);
});
