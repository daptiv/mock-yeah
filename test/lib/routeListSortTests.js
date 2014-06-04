var routeListSort = require('../../src/lib/routeListSort'),
    chai = require('chai');

describe('routeListSort', function () {


    beforeEach(function () {
        chai.should();
    });

    it('should sort a list of routes with paramaterized routes in reverse file order at bottom of list', function () {
        var sortedList = [
            'file/as',
            'file/as/:a',
            'file/as/:a/route',
            'file/as/aspecific/route'
        ].sort(routeListSort);

        sortedList.should.deep.equal([
            'file/as',
            'file/as/aspecific/route',
            'file/as/:a/route',
            'file/as/:a'
        ]);
    });
});
