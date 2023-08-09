const chai = require('chai');
const sinon = require('sinon');
const HomeController = require('../controllers/homeController');

const expect = chai.expect;

describe('HomeController', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('.index', () => {
        it('should render the home view', () => {
            const req = {};
            const res = { render: sandbox.stub() };

            HomeController.index(req, res);

            expect(res.render.calledWith('home')).to.be.true;
        });
    });
});
