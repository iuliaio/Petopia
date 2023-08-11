const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const userRepository = require('../repositories/userRepository');
const UserController = require('../controllers/userController');

chai.use(chaiHttp);
const expect = chai.expect;

describe('UserController', () => {
    let userRepositoryStub;
    let reqMock;
    let resMock;
    let nextSpy;

    beforeEach(() => {
        userRepositoryStub = sinon.stub(userRepository);
        reqMock = {
            session: {},
            body: {},
        };
        resMock = {
            render: sinon.stub(),
            redirect: sinon.stub(),
        };
        nextSpy = sinon.spy();
    });

    afterEach(() => {
        userRepositoryStub.restore();
    });

    describe('.index', () => {
        it('should render the loginChoice view', () => {
            UserController.index(reqMock, resMock);

            expect(resMock.render.calledWith('loginChoice')).to.be.true;
        });
    });

    describe('.login', () => {
        it('should render the login view', () => {
            UserController.login(reqMock, resMock);

            expect(resMock.render.calledWith('login')).to.be.true;
        });
    });

    describe('.authenticate', () => {
        it('should set user session and redirect to /pets when authentication succeeds', async () => {
            const user = { id: 1, first_name: 'John', last_name: 'Doe' };
            userRepositoryStub.getByEmailPassword.resolves(user);

            reqMock.body = { /* Provide user credentials */ };
            await UserController.authenticate(reqMock, resMock, nextSpy);

            expect(reqMock.session.user).to.deep.equal({ id: 1, name: 'John Doe' });
            expect(resMock.redirect.calledWith('/pets')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should redirect to /auth/login when authentication fails', async () => {
            userRepositoryStub.getByEmailPassword.resolves(null);

            reqMock.body = { /* Provide user credentials */ };
            await UserController.authenticate(reqMock, resMock, nextSpy);

            expect(reqMock.session.user).to.be.undefined;
            expect(resMock.redirect.calledWith('/auth/login')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should call next with an error if an error occurs', async () => {
            const expectedError = new Error('Database error');
            userRepositoryStub.getByEmailPassword.rejects(expectedError);

            reqMock.body = { /* Provide user credentials */ };
            await UserController.authenticate(reqMock, resMock, nextSpy);

            expect(reqMock.session.user).to.be.undefined;
            expect(resMock.redirect.called).to.be.false;
            expect(nextSpy.calledWith(expectedError)).to.be.true;
        });
    });

    describe('.shelterRegister', () => {
        it('should render the shelterRegister view', () => {
            UserController.shelterRegister(reqMock, resMock);

            expect(resMock.render.calledWith('shelterRegister')).to.be.true;
        });
    });

    describe('.shelterStore', () => {
        it('should insert a new user and redirect to /auth/login', async () => {
            userRepositoryStub.insert.resolves(/* Inserted user ID */);

            reqMock.body = { /* Provide user data */ };
            await UserController.shelterStore(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.insert.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.calledWith('/auth/login')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should call next with an error if an error occurs', async () => {
            const expectedError = new Error('Database error');
            userRepositoryStub.insert.rejects(expectedError);

            reqMock.body = { /* Provide user data */ };
            await UserController.shelterStore(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.insert.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.called).to.be.false;
            expect(nextSpy.calledWith(expectedError)).to.be.true;
        });
    });

    describe('.adopterRegister', () => {
        it('should render the adopterRegister view', () => {
            UserController.adopterRegister(reqMock, resMock);

            expect(resMock.render.calledWith('adopterRegister')).to.be.true;
        });
    });

    describe('.adopterStore', () => {
        it('should insert a new user and redirect to /', async () => {
            userRepositoryStub.insert.resolves(/* Inserted user ID */);

            reqMock.body = { /* Provide user data */ };
            await UserController.adopterStore(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.insert.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.calledWith('/')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should call next with an error if an error occurs', async () => {
            const expectedError = new Error('Database error');
            userRepositoryStub.insert.rejects(expectedError);

            reqMock.body = { /* Provide user data */ };
            await UserController.adopterStore(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.insert.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.called).to.be.false;
            expect(nextSpy.calledWith(expectedError)).to.be.true;
        });
    });

    describe('.edit', () => {
        it('should render the editProfile view', () => {
            UserController.edit(reqMock, resMock);

            expect(resMock.render.calledWith('editProfile')).to.be.true;
        });
    });

    describe('.update', () => {
        it('should update user data and redirect to /', async () => {
            userRepositoryStub.update.resolves();

            reqMock.body = { /* Provide updated user data */ };
            await UserController.update(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.update.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.calledWith('/')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should call next with an error if an error occurs', async () => {
            const expectedError = new Error('Database error');
            userRepositoryStub.update.rejects(expectedError);

            reqMock.body = { /* Provide updated user data */ };
            await UserController.update(reqMock, resMock, nextSpy);

            expect(userRepositoryStub.update.calledWith(reqMock.body)).to.be.true;
            expect(resMock.redirect.called).to.be.false;
            expect(nextSpy.calledWith(expectedError)).to.be.true;
        });
    });

    describe('.logout', () => {
        it('should destroy the session and redirect to /', () => {
            UserController.logout(reqMock, resMock, nextSpy);

            expect(reqMock.session).to.be.empty;
            expect(resMock.redirect.calledWith('/')).to.be.true;
            expect(nextSpy.called).to.be.false;
        });

        it('should call next with an error if session destruction fails', () => {
            const expectedError = new Error('Session destruction error');
            reqMock.session.destroy = sinon.stub().yields(expectedError);

            UserController.logout(reqMock, resMock, nextSpy);

            expect(reqMock.session).to.be.empty;
            expect(resMock.redirect.called).to.be.false;
            expect(nextSpy.calledWith(expectedError)).to.be.true;
        });
    });
});
