/*jshint node:true */
var path = require('path'),
    restify = require(path.resolve('./node_modules/restify/lib/index.js')),
    createRoutes = require('./lib/createRoutes'),
    fs = require('fs');
var server = restify.createServer();
createRoutes(server);
if (fs.existsSync(process.env.PORT)) {
    fs.unlinkSync(process.env.PORT);
}
server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

