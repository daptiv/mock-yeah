/*jshint node:true */


var _ = require('underscore');

function getFilePoints(filenameSegments, params) {
    var points = 0,
        exactMatches = 0,
        segment,
        paramValue;

    while (filenameSegments.length > 0) {
        segment = filenameSegments.pop();
        paramValue = params[filenameSegments.length];
        if (segment.indexOf(':') === 0) {
            points += 1;
        } else if (segment === paramValue) {
            exactMatches += 1;
            points += exactMatches + params.length - filenameSegments.length;
        }
    }
    return points;
}

function getRouteParams(route, params) {
    var routeParts = route.match(/\:[^\:\/]*/gi);

    return _.map(routeParts, function (routePart) {
        return params[routePart.replace(':', '')];
    });
}

function getFileParts(file) {
    var fileParts = file.split('.');

    return {
        type: fileParts.pop(),
        method: fileParts.pop(),
        fileParts: fileParts
    };
}

module.exports = {
    get: function (files, params, route, method) {
        if (!files || !params || !route || !method) {
            return;
        }

        var routeParams = getRouteParams(route, params),
            maxValue = 0,
            file;

        _.each(files, function (filename) {
            var fileParts = getFileParts(filename);

            if (fileParts.type.toLowerCase() !== 'json' ||
                fileParts.method.toLowerCase() !== method ||
                fileParts.fileParts.length !== routeParams.length)
            {
                return;
            }

            var points = fileParts.fileParts.length === 0 ? 1 : getFilePoints(fileParts.fileParts, routeParams);

            if (maxValue < points) {
                maxValue = points;
                file = filename;
            }
        });
        return file;
    }
};
