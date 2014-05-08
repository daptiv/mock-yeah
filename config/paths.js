/*jshint node:true */

var path = require('path');

var Folder = function (folder) {
    this.folder = folder;
};
Folder.prototype = {

    allFilesPattern: function () {
        return path.join(this.folder, '**/*');
    },

    allJsFilesPattern: function () {
        return this.getFilePattern('js');
    },

    allLessFilesPattern: function () {
        return this.getFilePattern('less');
    },

    allTsFilesPattern: function () {
        return this.getFilePattern('ts');
    },

    exclude: function () {
        return new Folder('!' + this.folder);
    },

    getFilePattern: function (extension) {
        return path.join(this.folder, '**/*.' + extension);
    },

    getFilePath: function (file) {
        return path.join(this.folder,  file);
    },

    dir: function (folderName) {
        if (folderName) {
            return this.getFilePath(folderName);
        }
        return this.folder;
    }

};

var paths = {
    dependencies: new Folder('node_modules'),
    source: new Folder(''),
    test: new Folder('test'),
    output: {
        root: new Folder('output'),
        toolsTest: new Folder('output/test')
    },
    server: {
        mockApiData: new Folder('mockApiData')
    }
};

module.exports = paths;
