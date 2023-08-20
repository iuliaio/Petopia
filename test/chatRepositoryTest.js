const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ChatRepository = require('../repositories/chatRepository');
const sqlite3 = require("sqlite3");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ChatRepository', () => {
    let db;
    let chatRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        chatRepository = new ChatRepository(db)
    });

    describe('.all', () => {
        it('should return a list of chats for a user', async () => {
            const userId = 123;
            let chats = await chatRepository.all(userId)
            expect(chats).to.be.an("array");
        });
    });

    describe('.get', () => {
        it('should return messages for a chat', async () => {
            const chatId = 456;
            const messages = await chatRepository.get(chatId);
            expect(messages).to.be.an('array');
        });
    });

    describe('.insert', () => {
        it('should insert a new chat', async () => {
            const user1Id = 123;
            const user2Id = 456;
            const insertedId = await chatRepository.insert(user1Id, user2Id);
            expect(insertedId).to.be.an('int');
        });
    });

    describe('.add_message', () => {
        it('should add a new message to a chat', async () => {
            const messageDTO = {
                sender_id: 1, recipient_id: 2, chat_id: 1, message: "This is a message"
            };
            const insertedId = await chatRepository.add_message(messageDTO);
            expect(insertedId).to.be.an('int');
        });
    });
});
