const chai = require('chai');
const sinon = require('sinon');
const CommentRepository = require('../repositories/commentRepository');
const CommentController = require('../controllers/commentController');
const sqlite3 = require("sqlite3");

const expect = chai.expect;

describe('CommentController', () => {
    let db;
    let commentRepository;
    let commentController;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        commentRepository = new CommentRepository();
        commentController = new CommentController(commentRepository);
    });

    describe('.delete', () => {
        it('should delete a comment and redirect on success', async () => {
            const req = { params: { commentId: 123 } };
            const res = { redirect: sinon.spy() };
            const next = sinon.spy();

            await commentController.delete(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.update', () => {
        it('should update a comment and redirect on success', async () => {
            const req = { params: { commentId: 123 }, body: { content: 'Updated content' } };
            const res = { redirect: sinon.spy() };
            const next = sinon.spy();

            await commentController.update(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.like', () => {
        it('should increment likes for a comment and redirect on success', async () => {
            const req = { params: { commentId: 123 } };
            const res = { redirect: sinon.spy() };
            const next = sinon.spy();

            await commentController.like(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });

    describe('.dislike', () => {
        it('should increment dislikes for a comment and redirect on success', async () => {
            const req = { params: { commentId: 123 } };
            const res = { redirect: sinon.spy() };
            const next = sinon.spy();

            await commentController.dislike(req, res, next);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.firstCall.args[0]).to.equal('TODO');
            expect(next.called).to.be.false;
        });
    });
});
