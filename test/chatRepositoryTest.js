const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const ChatRepository = require('../repositories/chatRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ChatRepository', () => {
    let dbStub;

    beforeEach(() => {
        dbStub = sinon.stub(db);
    });

    afterEach(() => {
        dbStub.restore();
    });

    describe('.all', () => {
        it('should return a list of chats for a user', async () => {
            const expectedChats = [/* ... */]; // Define your expected chats here
            const userId = 123; // Replace with a valid user ID
            dbStub.all.withArgs('SELECT * FROM chats where user1_id = ? or user2_id = ?', [userId, userId]).yields(null, expectedChats);

            const chats = await ChatRepository.all(userId);

            expect(chats).to.deep.equal(expectedChats);
        });

        it('should reject with an error if there is a database error', async () => {
            const userId = 123; // Replace with a valid user ID
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(ChatRepository.all(userId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.get', () => {
        it('should return messages for a chat', async () => {
            const expectedMessages = [/* ... */]; // Define your expected messages here
            const chatId = 456; // Replace with a valid chat ID
            dbStub.all.withArgs('SELECT * FROM messages where chat_id = ?', [chatId]).yields(null, expectedMessages);

            const messages = await ChatRepository.get(chatId);

            expect(messages).to.deep.equal(expectedMessages);
        });

        it('should reject with an error if there is a database error', async () => {
            const chatId = 456; // Replace with a valid chat ID
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(ChatRepository.get(chatId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.insert', () => {
        it('should insert a new chat', async () => {
            const user1Id = 123; // Replace with a valid user ID
            const user2Id = 456; // Replace with another valid user ID
            const expectedId = 789; // Replace with the expected ID after insertion
            dbStub.run.yields(null, { lastId: expectedId });

            const insertedId = await ChatRepository.insert(user1Id, user2Id);

            expect(insertedId).to.equal(expectedId);
        });

        it('should reject with an error if there is a database error', async () => {
            const user1Id = 123; // Replace with a valid user ID
            const user2Id = 456; // Replace with another valid user ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ChatRepository.insert(user1Id, user2Id)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_message', () => {
        it('should add a new message to a chat', async () => {
            const messageDTO = { /* ... */ }; // Define the message data here
            dbStub.run.yields(null, { lastId: 123 }); // Replace with the expected lastId

            const insertedId = await ChatRepository.add_message(messageDTO);

            expect(insertedId).to.equal(123); // Replace with the expected lastId
        });

        it('should reject with an error if there is a database error', async () => {
            const messageDTO = { /* ... */ }; // Define the message data here
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ChatRepository.add_message(messageDTO)).to.be.rejectedWith(expectedError);
        });
    });
});
