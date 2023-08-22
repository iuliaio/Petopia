const chai = require('chai');
const sinon = require('sinon');
const UserRepository = require('../repositories/userRepository');
const UserController = require('../controllers/userController');
const sqlite3 = require("sqlite3");

const expect = chai.expect;

describe('UserController', () => {
    let db;
    let userController;
    let userRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        userRepository = new UserRepository(db)
        userController = new UserController(userRepository);
    });

    describe('.index', () => {
        it('should render the loginChoice view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            userController.index(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('loginChoice');
        });
    });

    describe('.login', () => {
        it('should render the login view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            userController.login(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('login');
        });
    });

    describe('.shelterRegister', () => {
        it('should render the shelterRegister view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            userController.shelterRegister(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('shelterRegister');
        });
    });

    describe('.authenticate', () => {
        it('should set user session and redirect to /pets when authentication succeeds', async () => {
            const req = {
                body: {email: "john@example.com", password: "password"},
                session: {user: {}}
            }
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await userController.authenticate(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('/pets');
            expect(next.called).to.be.false;
        });
    });

    describe('.shelterStore', () => {
        it('should insert a new user and redirect to /auth/login', async () => {
            const req = {
                body: {
                    first_name: "",
                    last_name: "",
                    phone: "+447975777666",
                    email: "ben@email.com",
                    password: "password",
                    profile_picture: "profile_image.jpg",
                    charity_name: "Animal Haven Shelter",
                    charity_id: "AH123",
                    description: "A shelter dedicated to rescuing and caring for animals in need.",
                    country: "United Kingdom",
                    county: "London",
                    zip_code: "SW1W 0NY",
                    address: "123 Pet Street",
                    created_at: "2023-08-11"
                }
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await userController.shelterStore(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('/auth/login');
            expect(next.called).to.be.false;
        });
    });

    describe('.adopterRegister', () => {
        it('should render the adopterRegister view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            userController.adopterRegister(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('adopterRegister');
        });
    });

    describe('.adopterStore', () => {
        it('should insert a new user and redirect to /', async () => {
            const req = {
                body: {
                    first_name: "John",
                    last_name: "Doe",
                    phone: "+123456789",
                    email: "john@example.com",
                    password: "password",
                    profile_picture: "",
                    charity_name: "",
                    charity_id: "",
                    description: "",
                    country: "United Kingdom",
                    county: "England",
                    zip_code: "SW1A 1AA",
                    address: "10 Downing Street",
                    created_at: "2023-08-11"
                }
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await userController.adopterStore(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('/');
            expect(next.called).to.be.false;
        });
    });

    describe('.edit', () => {
        it('should render the editProfile view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            userController.edit(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('editProfile');
        });
    });

    describe('.update', () => {
        it('should update user data and redirect to /', async () => {
            const req = {
                body: {
                    id: 1,
                    first_name: "John",
                    last_name: "Doe",
                    phone: "+123456789",
                    email: "john@example.com",
                    password: "password",
                    profile_picture: "",
                    charity_name: "",
                    charity_id: "",
                    description: "",
                    country: "United Kingdom",
                    county: "England",
                    zip_code: "SW1A 1AA",
                    address: "10 Downing Street",
                    created_at: "2023-08-11"
                }

            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await userController.update(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('/');
            expect(next.called).to.be.false;
        });
    });
})
