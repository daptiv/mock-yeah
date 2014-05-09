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

                console.log(result.ast);
                
                deferred.resolve({
                    "_links": {
                        "self": { "href": "/gists/42" },
                        "star": { "href": "/gists/42/star" },
                    },
                    "id": "42",
                    "created_at": "2014-04-14T02:15:15Z",
                    "description": "Description of Gist",
                    "content": "String contents"
                });
            });
            return deferred.promise;
        }
    }
}

module.exports = Blueprint;
