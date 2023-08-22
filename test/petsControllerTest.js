const chai = require('chai');
const sinon = require('sinon');
const PetsRepository = require('../repositories/petsRepository');
const PetsController = require('../controllers/petsController');
const sqlite3 = require("sqlite3");

const expect = chai.expect;

describe('PetsController', () => {
    let db;
    let petsController;
    let petsRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        petsRepository = new PetsRepository(db);
        petsController = new PetsController(petsRepository);
    });

    describe('.index', () => {
        it('should render the appropriate view with pets', async () => {
            const req = {};
            const res = {render: sinon.spy()};
            const next = sinon.spy();

            await petsController.index(req, res, next);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.create', () => {
        it('should render the appropriate view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            petsController.create(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
        });
    });

    describe('.store', () => {
        it('should store a pet and redirect to the appropriate view on success', async () => {
            const req = {
                body: {
                    name: "Max",
                    species: "Dog",
                    breed: "Cute",
                    age: "2",
                    gender: "male",
                    size: "medium",
                    color: "black",
                    weight: "16 kg",
                    description: "Very sweet",
                    vaccination_status: "Fully vaccinated",
                    neutered: "no",
                    health_condition: "Healthy",
                    personality_traits: "Courageous",
                    user_id: 1
                }
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await petsController.store(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.show', () => {
        it('should render the appropriate view with the pet', async () => {
            const req = {params: {id: 1}};
            const res = {render: sinon.spy()};
            const next = sinon.spy();

            await petsController.show(req, res, next);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.edit', () => {
        it('should render the appropriate edit view with the pet', async () => {
            const req = {params: {id: 1}};
            const res = {render: sinon.spy()};

            await petsController.edit(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
        });
    });

    describe('.update', () => {
        it('should update a pet and redirect on success', async () => {
            const req = {
                body: {
                    id: 1,
                    name: "Bob",
                    species: "Dog",
                    breed: "Cute",
                    age: "2",
                    gender: "male",
                    size: "medium",
                    color: "black",
                    weight: "16 kg",
                    description: "Very sweet",
                    vaccination_status: "Fully vaccinated",
                    neutered: "no",
                    health_condition: "Healthy",
                    personality_traits: "Courageous"
                }
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await petsController.update(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.destroy', () => {
        it('should delete a pet and redirect on success', async () => {
            const req = {params: {id: 2}};
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await petsController.delete(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });
});
