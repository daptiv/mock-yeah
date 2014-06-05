/*jshint node:true */

var _ = require('underscore'),
    fieldFinder = /\{([\w\d]+?)\}/g;

function applyTemplateData(template, data) {
    var match,
        templateText,
        dataSuperset = _.clone(data),
        templateFieldDefaults = {};

    if (!data) {
        return template;
    }

    if (_.isObject(template)) {
        templateText = JSON.stringify(template);
    }

    while (match = fieldFinder.exec(templateText))
    {
        var field = match[1];
        templateFieldDefaults[field] = '{' + field + '}';
    }

    _.defaults(dataSuperset, templateFieldDefaults);

    var templatedText = _.template(templateText, dataSuperset, { interpolate: fieldFinder });
    return JSON.parse(templatedText);
}

module.exports = applyTemplateData;
