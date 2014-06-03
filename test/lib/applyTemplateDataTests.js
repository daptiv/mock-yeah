var applyTemplateData = require('../../src/lib/applyTemplateData'),
    chai = require('chai'),
    _ = require('underscore');

describe('applyTemplateData', function () {

    beforeEach(function () {
        chai.should();
    });

    it('should return original text when no template fields exist', function () {
        var templateText = 'asdfghjkl;';

        applyTemplateData(templateText, {}).should.equal(templateText);
    });

    it('should return original text when template data is null', function () {
        var templateText = 'asdfghjkl;';

        applyTemplateData(templateText, null).should.equal(templateText);
    });

    it('should replace template field with data', function () {
        var templateText = 'asdf{field}jkl;',
            data = {
                field: 'gh'
            };

        applyTemplateData(templateText, data).should.equal('asdf' + data.field + 'jkl;');
    });

    it('should replace template field with empty string when no corresponding data is supplied', function () {
        var templateText = 'asdf{field}jkl;';

        applyTemplateData(templateText, {}).should.equal('asdfjkl;');
    });

    it('should replace template field with empty string when corresponding data is null', function () {
        var templateText = 'asdf{field}jkl;';

        applyTemplateData(templateText, { field: null }).should.equal('asdfjkl;');
    });

    it('should return correct text when extra data is supplied', function () {
        var templateText = 'asdf{field1}jkl;',
            data = {
                field1: 'gh',
                field2: 'qwerty'
            };

        applyTemplateData(templateText, data).should.equal('asdf' + data.field1 + 'jkl;');
    });

    it('should replace multiple unique template fields with data', function () {
        var templateText = '{field1}{field2}{field3}',
            data = {
                field1: 'asdf',
                field2: 'gh',
                field3: 'jkl;'
            };

        applyTemplateData(templateText, data).should.equal(_.values(data).join(''));
    });

    it('should replace multiple duplicate fields with data', function () {
        var templateText = '{field}{field}{field}',
            data = {
                field: 'qwerty'
            };

        applyTemplateData(templateText, data).should.equal(data.field + data.field + data.field);
    });
});
