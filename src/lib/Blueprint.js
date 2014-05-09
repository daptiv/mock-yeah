/*jshint node:true */

var protagonist = require('protagonist'),
    fs = require('fs'),
    Q = require('q');

function Blueprint(path) {
    var blueprintRaw = fs.readFileSync(path, 'utf8');



    return {
        read: function () {
            var deferred = Q.defer();
            protagonist.parse(blueprintRaw, function (error, result) {
                if (error) {
                    console.log(error);
                    return;
                }

                deferred.resolve(result);
            });
            return deferred.promise;
        }
    };
}

module.exports = Blueprint;
