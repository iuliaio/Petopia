const chai = require('chai');
const sinon = require('sinon');
const ForumRepository = require('../repositories/forumRepository');
const CommentRepository = require('../repositories/commentRepository');
const ForumController = require('../controllers/forumController');
const sqlite3 = require("sqlite3");

const expect = chai.expect;

describe('ForumController', () => {
    let db;
    let forumController;
    let forumRepository;
    let commentRepository;

    beforeEach(() => {
        db = new sqlite3.Database("./database.db");
        forumRepository = new ForumRepository(db);
        commentRepository = new CommentRepository(db);
        forumController = new ForumController(forumRepository, commentRepository);
    });

    afterEach(() => {
    });

    describe('.index', () => {
        it('should render the appropriate view with posts', async () => {
            const req = {};
            const res = {render: sinon.spy()};
            const next = sinon.spy();

            await forumController.index(req, res, next);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.create', () => {
        it('should render the appropriate view', () => {
            const req = {};
            const res = {render: sinon.spy()};

            forumController.create(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
        });
    });

    describe('.store', () => {
        it('should store a post and redirect to the appropriate view on success', async () => {
            const req = {
                body: {
                    title: "Title", content: "Content"
                }, session: {user: {id: 1}}
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await forumController.store(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.show', () => {
        it('should render the appropriate view with post and comments', async () => {
            const req = {params: {id: 123}};
            const res = {render: sinon.spy()};
            const next = sinon.spy();

            await forumController.show(req, res, next);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.edit', () => {
        it('should render the appropriate view with post', async () => {
            const req = {params: {id: 123}};
            const res = {render: sinon.spy()};

            await forumController.edit(req, res);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.firstCall.args[0]).to.equal('TODO');
        });
    });

    describe('.update', () => {
        it('should update a post and redirect on success', async () => {
            const req = {
                params: {id: 123}, body: {
                    title: "Title", content: "Content"
                }, session: {user: {id: 1}}
            };
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await forumController.update(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.destroy', () => {
        it('should delete a post and redirect on success', async () => {
            const req = {params: {id: 123}};
            const res = {redirect: sinon.spy()};
            const next = sinon.spy();

            await forumController.destroy(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });
});
