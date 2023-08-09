const chai = require('chai');
const sinon = require('sinon');
const userRepository = require('../repositories/userRepository');
const UserController = require('../controllers/userController');

const expect = chai.expect;

describe('UserController', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('.authenticate', () => {
        it('should authenticate a user and redirect to /pets on success', async () => {
            const mockUser = { /* Create a mock user object here */ };
            const req = { body: { /* Provide email and password here */ }, session: {} };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(userRepository, 'getByEmailPassword').resolves(mockUser);

            await UserController.authenticate(req, res);

            expect(req.session.user).to.deep.equal({ id: mockUser.id, name: `${mockUser.first_name} ${mockUser.last_name}` });
            expect(res.redirect.calledWith('/pets')).to.be.true;
        });

        it('should redirect to /auth/login when authentication fails', async () => {
            const req = { body: { /* Provide email and password here */ } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(userRepository, 'getByEmailPassword').resolves(null);

            await UserController.authenticate(req, res);

            expect(res.redirect.calledWith('/auth/login')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { body: { /* Provide email and password here */ } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(userRepository, 'getByEmailPassword').throws(new Error('Some error'));

            await UserController.authenticate(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.shelterStore', () => {
        it('should store a shelter user and redirect to /auth/login on success', async () => {
            const req = { body: { /* Provide user data here */ } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(userRepository, 'insert').resolves();

            await UserController.shelterStore(req, res);

            expect(res.redirect.calledWith('/auth/login')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { body: { /* Provide user data here */ } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(userRepository, 'insert').throws(new Error('Some error'));

            await UserController.shelterStore(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    // Other tests for different methods
});
