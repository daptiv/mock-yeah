var restify = require('restify'),
    createRoutes = require('./lib/createRoutes'),
    fs = require('fs');

var server = restify.createServer();
createRoutes(server, process.argv[2]);

if (fs.existsSync(process.env.PORT)) {
    fs.unlinkSync(process.env.PORT);
}

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

