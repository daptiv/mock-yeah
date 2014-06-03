/*jshint node:true */

var _ = require('underscore'),
    fieldFinder = /\{([\w\d]+?)\}/g;

function applyTemplateData(template, data) {
    var match,
        templateText;

    if (!data) {
        return template;
    }

    var originalDataKeys = _.keys(data);

    if (_.isObject(template)) {
        templateText = JSON.stringify(template);
    }

    while (match = fieldFinder.exec(templateText))
    {
        var field = match[1];
        var keyExistsInData = _.contains(originalDataKeys, field);
        data[field] = (keyExistsInData && !data[field]) ? '' : '{' + field + '}';
    }

    var templatedText = _.template(templateText, data, { interpolate: fieldFinder });
    return JSON.parse(templatedText);
}

module.exports = applyTemplateData;
