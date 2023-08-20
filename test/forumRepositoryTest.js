const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ForumRepository = require('../repositories/forumRepository');
const sqlite3 = require("sqlite3");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ForumRepository', () => {
    let db;
    let forumRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        forumRepository = new ForumRepository(db);
    });

    describe('.all', () => {
        it('should return a list of posts', async () => {
            const posts = await forumRepository.all();
            expect(posts).to.be.an('array');
        });
    });

    describe('.get', () => {
        it('should return a post by ID', async () => {
            const post_id = 123;
            const post = await forumRepository.get(post_id);
            expect(post).to.be.an('array');
        });
    });

    describe('.insert', () => {
        it('should insert a new post', async () => {
            const post_data = {title: 'New Post', content: 'This is a new post', user_id: 1};
            const inserted_id = await forumRepository.insert(post_data);
            expect(inserted_id).to.be.a('number');
        });
    });

    describe('.update', () => {
        it('should update a post', async () => {
            const post_data = {id: 123, title: 'Updated Post', content: 'This post is updated', user_id: 1};
            const updated_id = await forumRepository.update(post_data);
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.delete', () => {
        it('should delete a post and its associated comments', async () => {
            const post_id = 123;
            const deleted_id = await forumRepository.delete(post_id);
            expect(deleted_id).to.be.a('number');
        });
    });

    describe('.add_like', () => {
        it('should increment likes for a post', async () => {
            const post_id = 123;
            const updated_id = await forumRepository.add_like(post_id);
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.add_dislike', () => {
        it('should increment dislikes for a post', async () => {
            const post_id = 123;
            const updated_id = await forumRepository.add_dislike(post_id);
            expect(updated_id).to.be.a('number');
        });
    });
});
