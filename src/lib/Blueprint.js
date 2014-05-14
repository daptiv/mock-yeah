/*jshint node:true */

var protagonist = require('protagonist'),
    fs = require('fs'),
    Q = require('q');

module.exports.read = function (path) {
    var blueprintRaw = fs.readFileSync(path, 'utf8');

    var deferred = Q.defer();
    protagonist.parse(blueprintRaw, function (error, result) {
        if (error) {
            console.log(error);
            deferred.reject(error);
            return;
        }

        deferred.resolve(result);
    });
    return deferred.promise;
};
