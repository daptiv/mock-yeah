var mockFileNameProvider = require('../../src/lib/mockFileNameProvider'),
    chai = require('chai');

describe('mockFileNameProvider', function () {


    beforeEach(function () {
        this.should = chai.should();
    });

    describe('get', function () {
        it('should return undefined when no file extension is used', function () {
            this.should.not.exist(mockFileNameProvider.get(
                ['longlist.get'],
                {'routeId': 'longlist'},
                'this/:routeId',
                'get'
            ));
        });

        it('should return undefined when non json file extension is used', function () {
            this.should.not.exist(mockFileNameProvider.get(
                ['longlist.get.text'],
                {'routeId': 'longlist'},
                'this/:routeId',
                'get'
            ));
        });

        it('should return undefined when no files are specified', function () {
            this.should.not.exist(mockFileNameProvider.get());
        });

        it('should return undefined when an empty file list is provided', function () {
            this.should.not.exist(mockFileNameProvider.get([]));
        });

        it('should return undefined when paramValue is not specified and no default file is provided', function () {
            this.should.not.exist(mockFileNameProvider.get(['longlist.get.json']));
        });

        it('should return undefined when paramValue is not specified', function () {
            this.should.not.exist(mockFileNameProvider.get([':routeId.get.json']));
        });

        it('should return undefined when route is not specified', function () {
            this.should.not.exist(mockFileNameProvider.get([':routeId.get.json'], {}));
        });

        it('should return undefined when method is not specified', function () {
            this.should.not.exist(mockFileNameProvider.get([':routeId.get.json'], {}, ':this/is/:a/route'));
        });

        it('should return undefined when paramValue is not found without default', function () {
            this.should.not.exist(mockFileNameProvider.get(
                ['longlist.get.json'],
                {'routeId': 'shortlist'},
                'this/:routeId',
                'get'
            ));
        });

        it('should return undefined when route :params are not the same length as the file segments specified and no default file is provided', function () {
            this.should.not.exist(mockFileNameProvider.get(['longlist.get.json'], {one: 'one', two: 'two'}, 'route/:one/:two', 'get'));
        });

        it('should return route with specified param without specified default', function () {
            mockFileNameProvider.get(
                ['longlist.get.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'get'
            ).should.equal('longlist.get.json');
        });

        it('should return route with specified param with specified default', function () {
            mockFileNameProvider.get(
                ['longlist.get.json', ':routeId.get.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'get'
            ).should.equal('longlist.get.json');
        });

        it('should return route with specified param with specified default regardless of order', function () {
            mockFileNameProvider.get(
                [':routeId.get.json', 'longlist.get.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'get'
            ).should.equal('longlist.get.json');
        });

        it('should return default route when it is only file', function () {
            mockFileNameProvider.get(
                [':routeId.get.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'get'
            ).should.equal(':routeId.get.json');
        });

        it('should return default route when param is not found', function () {
            mockFileNameProvider.get(
                ['shortlist.get.json', ':routeId.get.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'get'
            ).should.equal(':routeId.get.json');
        });

        it('should return default route when param value is specified twice in the same string', function () {
            mockFileNameProvider.get(
                ['blahblah.get.json', ':routeId.get.json'],
                {routeId: 'blah'},
                'this/:routeId',
                'get'
            ).should.equal(':routeId.get.json');
        });

        it('should return undefined when param value is specified twice in the same path string and is not found without default', function () {
            this.should.not.exist(mockFileNameProvider.get(
                ['blahblah.get.json'],
                {routeId: 'blah'},
                'this/:routeId',
                'get'
            ));
        });

        it('should return a route matching 0 variable called get', function () {
            mockFileNameProvider.get(
                ['get.json'],
                {routeId: 'get'},
                'this',
                'get'
            ).should.equal('get.json');
        });

        it('should return a route matching 1 variable called get', function () {
            mockFileNameProvider.get(
                ['get.get.json', ':1.get.json'],
                {routeId: 'get'},
                'this/:routeId',
                'get'
            ).should.equal('get.get.json');
        });

        it('should return a route matching 1 variable called get regardless of order', function () {
            mockFileNameProvider.get(
                [':1.get.json', 'get.get.json'],
                {routeId: 'get'},
                'this/:routeId',
                'get'
            ).should.equal('get.get.json');
        });

        it('should return a route matching 1 variable called json', function () {
            mockFileNameProvider.get(
                ['json.get.json', ':1.get.json'],
                {routeId: 'json'},
                'this/:routeId',
                'get'
            ).should.equal('json.get.json');
        });

        it('should return a route matching 1 variable called json regardless of order', function () {
            mockFileNameProvider.get(
                [':1.get.json', 'json.get.json'],
                {routeId: 'json'},
                'this/:routeId',
                'get'
            ).should.equal('json.get.json');
        });

        it('should return a route matching 2 params', function () {
            mockFileNameProvider.get(
                ['one.two.get.json', ':1.:2.get.json'],
                {one: 'one', two: 'two'},
                'this/:one/:two',
                'get'
            ).should.equal('one.two.get.json');
        });

        it('should return a route matching 2 params regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.get.json', 'one.two.get.json'],
                {one: 'one', two: 'two'},
                'this/:one/:two',
                'get'
            ).should.equal('one.two.get.json');
        });

        it('should return a route matching 1 param and 1 wildcard', function () {
            mockFileNameProvider.get(
                ['one.:1.get.json', ':1.:2.get.json'],
                {one: 'one', two: 'nomatch'},
                'this/:one/:two',
                'get'
            ).should.equal('one.:1.get.json');
        });

        it('should return a route matching 1 param and 1 wildcard regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.get.json', 'one.:1.get.json'],
                {one: 'one', two: 'nomatch'},
                'this/:one/:two',
                'get'
            ).should.equal('one.:1.get.json');
        });

        it('should return a route matching 1 wildcard and 1 param', function () {
            mockFileNameProvider.get(
                [':1.one.get.json', ':1.:2.get.json'],
                {one: 'nomatch', two: 'one'},
                'this/:one/:two',
                'get'
            ).should.equal(':1.one.get.json');
        });

        it('should return a route matching 1 wildcard and 1 param regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.get.json', ':1.one.get.json'],
                {one: 'nomatch', two: 'one'},
                'this/:one/:two',
                'get'
            ).should.equal(':1.one.get.json');
        });

        it('should return a route matching 2 wildcards', function () {
            mockFileNameProvider.get(
                [
                    ':1.one.get.json',
                    ':1.:2.get.json'
                ],
                {one: 'nomatch', two: 'nomatch'},
                'this/:one/:two',
                'get'
            ).should.equal(':1.:2.get.json');
        });

        it('should return a route matching 3 params', function () {
            mockFileNameProvider.get(
                ['one.two.three.get.json', ':1.:2.:3.json'],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.two.three.get.json');
        });

        it('should return a route matching 3 params regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.:3.json', 'one.two.three.get.json'],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.two.three.get.json');
        });

        it('should return a route matching 2 params and a wildcard', function () {
            mockFileNameProvider.get(
                ['one.two.:3.get.json', ':1.:2.:3.get.json'],
                {one: 'one', two: 'two', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.two.:3.get.json');
        });

        it('should return a route matching 2 params and a wildcard regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.:3.get.json', 'one.two.:3.get.json'],
                {one: 'one', two: 'two', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.two.:3.get.json');
        });

        it('should return a route matching 1 param and 2 wildcards', function () {
            mockFileNameProvider.get(
                ['one.:2.:3.get.json', ':1.:2.:3.get.json'],
                {one: 'one', two: 'nomatch', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.:2.:3.get.json');
        });

        it('should return a route matching 1 param and 2 wildcards regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.:3.get.json', 'one.:2.:3.get.json'],
                {one: 'one', two: 'nomatch', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.:2.:3.get.json');
        });

        it('should return a route matching 1 wildcard, 1 param then another wildcard', function () {
            mockFileNameProvider.get(
                [':1.two.:3.get.json', ':1.:2.:3.get.json'],
                {one: 'nomatch', two: 'two', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal(':1.two.:3.get.json');
        });

        it('should return a route matching 1 wildcard, 1 param then another wildcard regardless of order', function () {
            mockFileNameProvider.get(
                [':1.:2.:3.get.json', ':1.two.:3.get.json'],
                {one: 'nomatch', two: 'two', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal(':1.two.:3.get.json');
        });

        it('should return a route matching 3 wildcards', function () {
            mockFileNameProvider.get(
                [
                    ':1.one.two.get.json',
                    ':1.:2.:3.get.json'
                ],
                {one: 'nomatch', two: 'nomatch', three: 'nomatch'},
                'this/:one/:two/:three',
                'get'
            ).should.equal(':1.:2.:3.get.json');
        });

        it('should return front weighted match with multiple matching routes', function () {
            mockFileNameProvider.get(
                [
                    ':1.:2.:3.get.json',
                    ':1.two.three.get.json',
                    'one.:2.three.get.json'
                ],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.:2.three.get.json');
        });

        it('should return front weighted match with multiple matching routes regardless of order', function () {
            mockFileNameProvider.get(
                [
                    'one.:2.three.get.json',
                    ':1.two.three.get.json',
                    ':1.:2.:3.get.json'
                ],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal('one.:2.three.get.json');
        });

        it('should return more matched segments over front weighted match', function () {
            mockFileNameProvider.get(
                [
                    ':1.two.three.get.json',
                    'one.:2.:3.get.json',
                    ':1.:2.:3.get.json'
                ],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal(':1.two.three.get.json');
        });

        it('should return more matched segments over front weighted match regardless of order', function () {
            mockFileNameProvider.get(
                [
                    'one.:2.:3.get.json',
                    ':1.two.three.get.json',
                    ':1.:2.:3.get.json'
                ],
                {one: 'one', two: 'two', three: 'three'},
                'this/:one/:two/:three',
                'get'
            ).should.equal(':1.two.three.get.json');
        });

        it('should return undefined when method is not found in a file', function () {
            this.should.not.exist(mockFileNameProvider.get(
                ['longlist.get.json'],
                {'routeId': 'longlist'},
                'this/:routeId',
                'post'
            ));
        });

        it('should return post route when post is specified', function () {
            mockFileNameProvider.get(
                ['longlist.post.json'],
                {routeId: 'longlist'},
                'this/:routeId',
                'post'
            ).should.equal('longlist.post.json');
        });
    });
});
