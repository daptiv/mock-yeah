/*jshint node:true */

var folderReader = require('./folderReader'),
    routeListSort = require('./routeListSort'),
    _ = require('underscore'),
    routeHandlerFactory = require('./routeHandlerFactory'),
    paths = require('../../config/paths'),
    path = require('path');

var SUPPORTED_METHODS = ['get', 'post', 'put', 'del'],
    mockDataDir = paths.server.mockApiData.dir();

var mockApiLib = {};

mockApiLib.extractRouteParams = function (route) {
    return route.match(/(\:[^:\/]*)/gi);
};


function addRouteForFile(file, server) {
    var normalized = path.normalize(mockDataDir),
        route = path.relative(normalized, file);
    if (route !== '') {
        SUPPORTED_METHODS.forEach(function (method) {
            console.log('creating routes for "' + route + '" with method', method);
            server[method](route, routeHandlerFactory({
                route: route,
                method: method,
                directory: mockDataDir
            }));
        });
    }
}

function createRoutes(server) {
    console.log(mockDataDir);
    folderReader.recursiveListDirectories(mockDataDir, function (file_list) {
        file_list = _.map(file_list, function (file) {
            return file.replace(/#/g, ':');
        });
        file_list.sort(routeListSort);
        file_list.forEach(function (file) {
            addRouteForFile(file, server);
        });
    });
}

module.exports = createRoutes;
