var applyTemplateData = require('../../src/lib/applyTemplateData'),
    chai = require('chai');

describe('applyTemplateData', function () {

    beforeEach(function () {
        chai.should();
    });

    it('should return original text when no template fields exist', function () {
        var template = {
            key: 'asdfjkl;'
        };

        applyTemplateData(template, {}).should.deep.equal(template);
    });

    it('should return original text when template data is null', function () {
        var template = {
            key: 'asdfjkl;'
        };

        applyTemplateData(template, null).should.deep.equal(template);
    });

    it('should replace template field with data', function () {
        var template = {
                key: 'asdf{field}jkl;'
            },
            data = {
                field: 'gh'
            };

        applyTemplateData(template, data).should.deep.equal({ key: 'asdf' + data.field + 'jkl;'});
    });

    it('should not replace template field when no corresponding data is supplied', function () {
        var template = {
            key: 'asdf{field}jkl;'
        };

        applyTemplateData(template, {}).should.deep.equal(template);
    });

    it('should replace template field with empty string when corresponding data is null', function () {
        var template = {
            key: 'asdf{fieldBlah}jkl;'
        };

        applyTemplateData(template, { fieldBlah: null }).should.deep.equal({ key: 'asdfjkl;' });
    });

    it('should return correct text when extra data is supplied', function () {
        var template = {
                key: 'asdf{field1}jkl;'
            },
            data = {
                field1: 'gh',
                field2: 'qwerty'
            };

        applyTemplateData(template, data).should.deep.equal({ key: 'asdf' + data.field1 + 'jkl;' });
    });

    it('should replace multiple unique template fields with data', function () {
        var template = {
                key1: '{field1}{field2}',
                key2: '{field3}'
            },
            data = {
                field1: 'asdf',
                field2: 'gh',
                field3: 'jkl;'
            };

        applyTemplateData(template, data).should.deep.equal({
            key1: data.field1 + data.field2,
            key2: data.field3
        });
    });

    it('should replace multiple duplicate fields with data', function () {
        var template = {
                key1: '{field}{field}',
                key2: '{field}'
            },
            data = {
                field: 'qwerty'
            };

        applyTemplateData(template, data).should.deep.equal({
            key1: data.field + data.field,
            key2: data.field
        });
    });
});
