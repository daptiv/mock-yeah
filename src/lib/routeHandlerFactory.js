/*jshint node:true */

var RouteHandler = require('./RouteHandler');

function routeHandlerFactory(options) {
    var routeHandler = new RouteHandler(options);

    return routeHandler.getBoundHandler();
}

module.exports = routeHandlerFactory;
