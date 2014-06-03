/*jshint node:true */

var _ = require('underscore'),
    fieldFinder = /\{(.+?)\}/g;

function applyTemplateData(templateText, data) {
    var match;

    if (!data) {
        return templateText;
    }

    while (match = fieldFinder.exec(templateText))
    {
        var field = match[1];
        data[field] = data[field] || '';
    }

    return _.template(templateText, data, { interpolate: fieldFinder });
}

module.exports = applyTemplateData;
