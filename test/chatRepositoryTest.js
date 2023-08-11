const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const ChatRepository = require('../repositories/chatRepository');
const sqlite3 = require("sqlite3");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ChatRepository', () => {
    let dbStub;
    let db;
    let chatRepository;

    beforeEach(() => {
        db = new sqlite3.Database("./database.db");
        dbStub = sinon.stub(db);
        chatRepository = new ChatRepository(dbStub)
    });

    afterEach(() => {
    });

    describe('.all', () => {
        it('should return a list of chats for a user', async () => {
            const expectedChats = [/* ... */];
            const userId = 123;
            dbStub.all.withArgs('SELECT * FROM chats where user1_id = ? or user2_id = ?', [userId, userId]).yields(null, expectedChats);

            const chats = await chatRepository.all(userId);

            expect(chats).to.deep.equal(expectedChats);
        });

        it('should reject with an error if there is a database error', async () => {
            const userId = 123;
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(chatRepository.all(userId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.get', () => {
        it('should return messages for a chat', async () => {
            const expectedMessages = [/* ... */];
            const chatId = 456;
            dbStub.all.withArgs('SELECT * FROM messages where chat_id = ?', [chatId]).yields(null, expectedMessages);

            const messages = await chatRepository.get(chatId);

            expect(messages).to.deep.equal(expectedMessages);
        });

        it('should reject with an error if there is a database error', async () => {
            const chatId = 456;
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(chatRepository.get(chatId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.insert', () => {
        it('should insert a new chat', async () => {
            const user1Id = 123;
            const user2Id = 456;
            const expectedId = 789;
            dbStub.run.yields(null, {lastId: expectedId});

            const insertedId = await chatRepository.insert(user1Id, user2Id);

            expect(insertedId).to.equal(expectedId);
        });

        it('should reject with an error if there is a database error', async () => {
            const user1Id = 123;
            const user2Id = 456;
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(chatRepository.insert(user1Id, user2Id)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_message', () => {
        it('should add a new message to a chat', async () => {
            const messageDTO = { /* ... */};
            dbStub.run.yields(null, {lastId: 123});

            const insertedId = await chatRepository.add_message(messageDTO);

            expect(insertedId).to.equal(123);
        });

        it('should reject with an error if there is a database error', async () => {
            const messageDTO = { /* ... */};
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(chatRepository.add_message(messageDTO)).to.be(expectedError);
        });
    });
});
