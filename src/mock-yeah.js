/*jshint node:true */

var path = require('path'),
    restify = require('restify'),
    createRoutes = require('./lib/createRoutes'),
    fs = require('fs'),
    mockDataDir = process.argv[2],
    server = restify.createServer();


if (!mockDataDir) {
    console.log('Usage: node mock-yeah.js <mockDataDirectory>');
    return;
}

createRoutes(server, mockDataDir);

if (fs.existsSync(process.env.PORT)) {
    fs.unlinkSync(process.env.PORT);
}

server.listen(process.env.PORT || 8080, process.env.url || '127.0.0.1', function () {
    console.log('%s listening at %s', server.name, server.url);
});

