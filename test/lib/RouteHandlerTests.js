var RouteHandler = require('../../src/lib/RouteHandler'),
    chai = require('chai'),
    sinon = require('sinon').sandbox.create();

describe('RouteHandler', function () {


    beforeEach(function () {
        chai.should();
        this.routeHandler = new RouteHandler({
            directory: 'mockData/folder',
            route: '/this/:is/:the/current/:route',
            method: 'get',
        });
        this.sendSpy = sinon.spy();
        this.response = {
            send: this.sendSpy
        };

    });

    it('should return 400 when a matching static data file is not found', function () {
        var routeFilesStub = sinon.stub(this.routeHandler, '_getRouteFiles');
        this.routeHandler.handle({
            params: {
                is: 'this',
                the: 'is',
                route: 'theroute'
            }
        }, this.response);
        routeFilesStub.yield([
        ]);
        this.sendSpy.calledWith(400).should.be.true;
    });

    it('should return 200 and static response when a matching static data file is found', function () {

        var response = 'contents';
        sinon.stub(this.routeHandler, '_getFileContents').returns(response);
        var routeFilesStub = sinon.stub(this.routeHandler, '_getRouteFiles');
        this.routeHandler.handle({
            params: {
                is: 'this',
                the: 'is',
                route: 'theroute'
            },
        }, this.response);
        routeFilesStub.yield([
            '#this.#is.#route.get.json',
            '#this.#is.theroute.get.json'
        ]);
        this.sendSpy.calledWith(200, response).should.be.true;
    });
});
