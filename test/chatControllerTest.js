const chai = require('chai');
const sinon = require('sinon');
const ChatRepository = require('../repositories/chatRepository');
const ChatController = require('../controllers/chatController');
const sqlite3 = require("sqlite3");

const expect = chai.expect;

describe('ChatController', () => {

    let chatRepository;
    let chatController
    let db;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        chatRepository = new ChatRepository(db)
        chatController = new ChatController(chatRepository)
    });

    describe('.index', () => {
        it('should render the appropriate view with  chats', async () => {
            const req = {session: {user: {id: 1}}};
            const res = {render: sinon.spy()}
            const next = sinon.spy()

            await chatController.index(req, res, next)

            expect(res.render.calledOnce).to.be.true
            expect(res.render.firstCall.args[0]).to.equal('TODO')
            expect(next.called).to.be.false;
        });
    });

    describe('.show', () => {
        it('should render the appropriate view with chat', async () => {
            const req = {body: {id: 1}}
            const res = {render: sinon.spy()}
            const next = sinon.spy()

            await chatController.show(req, res, next)

            expect(res.render.calledOnce).to.be.true
            expect(res.render.firstCall.args[0]).to.equal('TODO')
            expect(next.called).to.be.false;
        });
    });

    describe('.store', () => {
        it('should store a new chat and redirect on success', async () => {
            const req = {
                session: {user: {id: 1}}, body: {user2_id: 2}
            }
            const res = {redirect: sinon.spy()}
            const next = sinon.spy()

            await chatController.store(req, res, next)

            expect(res.redirect.calledOnce).to.be.true
            expect(res.redirect.firstCall.args[0]).to.equal('TODO')
            expect(next.called).to.be.false;
        });
    });

    describe('.add_message', () => {
        it('should add a new message to a chat and redirect on success', async () => {
            const req = {
                session: {user: {id: 1}}, body: {
                    id: 1, message: "This is a message", recipient_id: 2
                }
            }
            const res = {redirect: sinon.spy()}
            const next = sinon.spy()

            await chatController.add_message(req, res, next)

            expect(res.redirect.calledOnce).to.be.true
            expect(res.redirect.firstCall.args[0]).to.equal('TODO')
            expect(next.called).to.be.false;
        });
    });
});
