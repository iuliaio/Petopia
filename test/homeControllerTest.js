const chai = require('chai');
const sinon = require('sinon');
const HomeController = require('../controllers/homeController');

const expect = chai.expect;

describe('HomeController', () => {

    beforeEach(() => {
    });

    afterEach(() => {
    });

    describe('.index', () => {
        it('should render the home view', () => {
            const req = {};
            const res = {render: sinon.spy()};
            const next = sinon.spy();

            const homeController = new HomeController();

            homeController.index(req, res, next);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('home');
            expect(next.called).to.be.false;
        });
    });
});
