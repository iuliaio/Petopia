const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const CommentRepository = require('../repositories/commentRepository');
const sqlite3 = require("sqlite3");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('CommentRepository', () => {
    let db;
    let commentRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        commentRepository = new CommentRepository(db);
    });

    describe('.delete', () => {
        it('should delete a comment', async () => {
            const comment_id = 123;
            const deleted_id = await commentRepository.delete(comment_id);
            expect(deleted_id).to.be.a('number');
        });
    });

    describe('.update', () => {
        it('should update a comment', async () => {
            const comment_id = 789;
            const content = 'Updated comment content';
            const updated_id = await commentRepository.update({comment_id, content});
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.add_like', () => {
        it('should increment likes for a comment', async () => {
            const comment_id = 101;
            const updated_id = await commentRepository.add_like(comment_id);
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.add_dislike', () => {
        it('should increment dislikes for a comment', async () => {
            const comment_id = 102;
            const updated_id = await commentRepository.add_dislike(comment_id);
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.allByPost', () => {
        it('should return all comments for a post', async () => {
            const post_id = 103;
            const comments = await commentRepository.allByPost(post_id);
            expect(comments).to.be.an('array');
        });
    });

    describe('.insert', () => {
        it('should insert a new comment', async () => {
            const post_id = 104;
            const user_id = 1;
            const content = 'New comment content';
            const inserted_id = await commentRepository.insert({post_id, user_id, content});
            expect(inserted_id).to.be.a('number');
        });
    });
});
