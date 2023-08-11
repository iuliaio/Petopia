const chai = require('chai');
const sinon = require('sinon');
const commentRepository = require('../repositories/commentRepository');
const CommentController = require('../controllers/commentController');

const expect = chai.expect;

describe('CommentController', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('.delete', () => {
        it('should delete a comment and redirect on success', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(commentRepository, 'delete').resolves();

            await CommentController.delete(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(commentRepository, 'delete').throws(new Error('Some error'));

            await CommentController.delete(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.update', () => {
        it('should update a comment and redirect on success', async () => {
            const req = { params: { id: 123 }, body: { content: 'Updated Content' } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(commentRepository, 'update').resolves();

            await CommentController.update(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { params: { id: 123 }, body: { content: 'Updated Content' } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(commentRepository, 'update').throws(new Error('Some error'));

            await CommentController.update(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.like', () => {
        it('should increment likes for a comment and redirect on success', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(commentRepository, 'add_like').resolves();

            await CommentController.like(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(commentRepository, 'add_like').throws(new Error('Some error'));

            await CommentController.like(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.dislike', () => {
        it('should increment dislikes for a comment and redirect on success', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(commentRepository, 'add_dislike').resolves();

            await CommentController.dislike(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { params: { id: 123 } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(commentRepository, 'add_dislike').throws(new Error('Some error'));

            await CommentController.dislike(req, res, next);

            expect(next.called).to.be.true;
        });
    });
});
