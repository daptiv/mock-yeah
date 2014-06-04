/*jshint node:true */

var _ = require('underscore'),
    fieldFinder = /\{([\w\d]+?)\}/g;

function applyTemplateData(template, data) {
    var match,
        templateText,
        dataSuperset = {};

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
        if (keyExistsInData) {
            dataSuperset[field] = data[field] || '';
        } else {
            dataSuperset[field] = '{' + field + '}';
        }
    }

    var templatedText = _.template(templateText, dataSuperset, { interpolate: fieldFinder });
    return JSON.parse(templatedText);
}

module.exports = applyTemplateData;
