/*jshint node:true */

var folderReader = require('./folderReader'),
    routeListSort = require('./routeListSort'),
    _ = require('underscore'),
    routeHandlerFactory = require('./routeHandlerFactory'),
    path = require('path'),
    blueprint = require('./blueprint');

var SUPPORTED_METHODS = ['get', 'post', 'put', 'del'];

function addRouteForFile(file, server, mockDataDir) {
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

function createRoutes(server, mockDataDir) {
    var blueprintPath = path.join(__dirname, '../../blueprints/gist-fox-api.md');

    blueprint.read(blueprintPath).then(function (result) {
        var resources = _.flatten(_.pluck(result.ast.resourceGroups, 'resources'));

        resources.forEach(function (resource) {
            console.log(resource.uriTemplate);
            var route = resource.uriTemplate;
            resource.actions.forEach(function (action) {
                if (action.examples.length > 0 && action.examples[0].responses.length > 0) {
                    var method = action.method.toLowerCase();
                    server[method](route, routeHandlerFactory({
                        route: route,
                        method: method,
                        directory: mockDataDir,
                        response: action.examples[0].responses[0]
                    }));
                }
            });
        });
    });

    folderReader.recursiveListDirectories(mockDataDir, function (file_list) {
        file_list = _.map(file_list, function (file) {
            return file.replace(/#/g, ':');
        });
        file_list.sort(routeListSort);
        file_list.forEach(function (file) {
            addRouteForFile(file, server, mockDataDir);
        });
    });
}

module.exports = createRoutes;
