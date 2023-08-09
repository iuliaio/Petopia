const chai = require('chai');
const sinon = require('sinon');
const chatsRepository = require('../repositories/chatRepository');
const ChatController = require('../controllers/chatController');

const expect = chai.expect;

describe('ChatController', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('.index', () => {
        it('should render the appropriate view with chats', async () => {
            const mockChats = [/* Create mock chat objects here */];
            const req = { session: { user: { id: 123 } } };
            const res = { render: sandbox.stub() };
            sandbox.stub(chatsRepository, 'all').resolves(mockChats);

            await ChatController.index(req, res);

            expect(res.render.calledWith('TODO', { chats: mockChats })).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { session: { user: { id: 123 } } };
            const res = { render: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(chatsRepository, 'all').throws(new Error('Some error'));

            await ChatController.index(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.show', () => {
        it('should render the appropriate view with chat', async () => {
            const mockChat = { /* Create a mock chat object here */ };
            const req = { body: { id: 123 } };
            const res = { render: sandbox.stub() };
            sandbox.stub(chatsRepository, 'get').resolves(mockChat);

            await ChatController.show(req, res);

            expect(res.render.calledWith('TODO', { chat: mockChat })).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { body: { id: 123 } };
            const res = { render: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(chatsRepository, 'get').throws(new Error('Some error'));

            await ChatController.show(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.store', () => {
        it('should store a new chat and redirect on success', async () => {
            const req = { session: { user: { id: 123 } }, body: { user2_id: 456 } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(chatsRepository, 'insert').resolves();

            await ChatController.store(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { session: { user: { id: 123 } }, body: { user2_id: 456 } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(chatsRepository, 'insert').throws(new Error('Some error'));

            await ChatController.store(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    describe('.add_message', () => {
        it('should add a new message to a chat and redirect on success', async () => {
            const req = { session: { user: { id: 123 } }, body: { id: 456, recipient_id: 789, message: 'Test Message' } };
            const res = { redirect: sandbox.stub() };
            sandbox.stub(chatsRepository, 'add_message').resolves();

            await ChatController.add_message(req, res);

            expect(res.redirect.calledWith('TODO')).to.be.true;
        });

        it('should handle errors and call next', async () => {
            const req = { session: { user: { id: 123 } }, body: { id: 456, recipient_id: 789, message: 'Test Message' } };
            const res = { redirect: sandbox.stub() };
            const next = sandbox.stub();
            sandbox.stub(chatsRepository, 'add_message').throws(new Error('Some error'));

            await ChatController.add_message(req, res, next);

            expect(next.called).to.be.true;
        });
    });

    // Other tests for other methods if needed
});
