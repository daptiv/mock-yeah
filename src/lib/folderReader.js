/*jshint node:true */

var execFile = require('child_process').execFile;

function processFindDirectoryResults(err, stdout) {
    return stdout.trim().split('\n');
}

function processFindFilesResults(stdout, directory) {
    var regex = new RegExp(directory + '/', 'g');
    return stdout.replace(regex, '').trim().split('\n');
}

module.exports.recursiveListDirectories = function (directory, callback) {
    execFile('find', [ directory, '-type', 'd', '!', '-empty'], function (err, stdout) {
        callback(processFindDirectoryResults(err, stdout));
    });
};

module.exports.listFiles = function (directory, callback) {
    execFile('find', [ directory, '-type', 'f', '-maxdepth', '1'], function (err, stdout) {
        callback(processFindFilesResults(stdout, directory));
    });
};
