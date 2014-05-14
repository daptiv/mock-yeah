/*jshint node:true */

var path = require('path'),
    _ = require('underscore'),
    folderReader = require('./folderReader'),
    mockFileNameProvider = require('./mockFileNameProvider');

function RouteHandler(options) {
    this.route = options.route;
    this.method = options.method;
    this.directory = options.directory;
    this.response = options.response;
}

RouteHandler.prototype = {

    _getFileContents: function (file) {
        return require(path.relative(__dirname, file.replace(/:/g, '#')));
    },

    _getDirectory: function (directory, route) {
        return path.join(directory, route.replace(/:/g, '#'));
    },

    _getRouteFiles: function (directory, route, callback) {
        folderReader.listFiles(this._getDirectory(directory, route), callback);
    },

    _getRouteFile: function (directory, params, route, method, callback) {
        this._getRouteFiles(directory, route, function (routeFiles) {
            routeFiles = _.map(routeFiles, function (file) {
                return file.replace(/#/g, ':');
            });
            callback(mockFileNameProvider.get(routeFiles, params, route, method));
        });
    },

    getBoundHandler: function () {
        return this.handle.bind(this);
    },

    handle: function (request, response) {
        var self = this;
        if (this.response) {
            var responseBody = JSON.parse(this.response.body);
            response.send(parseInt(this.response.name, 10), responseBody);
        }

        this._getRouteFile(this.directory, request.params, this.route, this.method, function (file) {
            if (file) {
                response.send(200, self._getFileContents(self._getDirectory(self.directory, self.route) + '/' + file));
            } else {
                var message = 'no static data available; create a file named like #routeParam.#routeParam2.get.json at ' + this._getDirectory(this.directory, this.route);
                console.error(message);
                response.send(400, message);
            }
        }.bind(this));
    }
};

module.exports = RouteHandler;
