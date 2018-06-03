let path = require('path');
let fs = require('fs');

let _copyFile = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.linkSync(src, dest);
    }
};

function _copyRecursive(src, dest, force) {
    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        fs.readdirSync(src).forEach(subfolder => {
            _copyRecursive(path.join(src, subfolder), path.join(dest, subfolder), force);
        });
    } else {
        if (force && fs.existsSync(dest)) {
            fs.unlinkSync(dest);
        }

        _copyFile(src, dest);
    }
}

let _createFolderRecursive = folder => {
    console.log('creating folder ' + folder);
    let currFolder = '';
    let folders = folder.split(path.sep);
    folders.forEach(f => {
        currFolder = f.indexOf(':') > -1 ? f + path.sep : path.join(currFolder, f);
        if (!fs.existsSync(currFolder)) {
            fs.mkdirSync(currFolder);
        }
    });
};

let _deleteFile = (filePath, attempts) => {
    attempts = attempts || 0;
    try {
        fs.unlinkSync(filePath);
    } catch (e) {
        console.log('delete file:' + filePath + ' failed. Attemp #' + attempts, e);
        if (attempts > 0) {
            _deleteFile(filePath, attempts - 1);
        }
    }
};

let _deleteEmptyFolder = (folderPath, attempts) => {
    attempts = attempts || 0;
    try {
        fs.rmdirSync(folderPath);
    } catch (e) {
        console.log('delete folder:' + folderPath + ' failed. Attemp #' + attempts, e);
        if (attempts > 0) {
            _deleteEmptyFolder(folderPath, attempts - 1);
        }
    }
};

let _deleteFolderRecursive = folder => {
    if (fs.existsSync(folder)) {
        fs.readdirSync(folder).forEach(file => {
            let curPath = path.join(folder, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                _deleteFolderRecursive(curPath);
            } else { // delete file
                _deleteFile(curPath, 5);
            }
        });
        _deleteEmptyFolder(folder);
    }
};

let _cleanFolder = (folder) => {
    console.log('clean folder', folder);
    _deleteFolderRecursive(folder);
    _createFolderRecursive(folder);
};

exports.copyFile = _copyFile;
exports.copyRecursive = _copyRecursive;
exports.createFolderRecursive = _createFolderRecursive;
exports.deleteFile = _deleteFile;
exports.deleteFolderRecursive = _deleteFolderRecursive;
exports.cleanFolder = _cleanFolder;
