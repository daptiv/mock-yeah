/*jshint node:true */

var path = require('path'),
    url = require('url'),
    _ = require('underscore'),
    folderReader = require('./folderReader'),
    mockFileNameProvider = require('./mockFileNameProvider'),
    applyTemplateData = require('./applyTemplateData'),
    fs = require('fs');

function RouteHandler(options) {
    this.route = options.route;
    this.method = options.method;
    this.directory = options.directory;
}

function replaceColonWithHash(str) {
    return str.replace(/:/g, '#');
}

RouteHandler.prototype = {

    _getFileContents: function (file) {
        return fs.readFileSync(replaceColonWithHash(file), {encoding: 'utf8'});
    },

    _getDirectory: function (directory, route) {
        return path.join(directory, replaceColonWithHash(route));
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
        return this.delayedHandle.bind(this);
    },

    delayedHandle: function (request, response) {
        setTimeout(_.partial(this.handle, request, response).bind(this), process.env['MOCK_YEAH_DELAY'] || 100);
    },

    handle: function (request, response) {
        this._getRouteFile(this.directory, request.params, this.route, this.method, function (file) {
            if (file) {
                var filePath = path.join(this._getDirectory(this.directory, this.route), file);
                console.log('serving static/templated data from', replaceColonWithHash(filePath));
                var templateFile = this._getFileContents(filePath);

                var queryStringParameters = url.parse(request.url, true).query;
                var templateData = _.extend({}, queryStringParameters, request.params);

                response.send(200, applyTemplateData(templateFile, templateData));
            } else {
                var message = 'no static data available; create a file of the form #routeParam.#routeParam2.get.json at ' + this._getDirectory(this.directory, this.route);
                console.error(message);
                response.send(400, message);
            }
        }.bind(this));
    }
};

module.exports = RouteHandler;
