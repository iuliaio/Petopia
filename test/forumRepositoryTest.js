const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const commentRepository = require('../repositories/commentRepository');
const ForumRepository = require('../repositories/forumRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('ForumRepository', () => {
    let dbStub;
    let commentRepositoryStub;

    beforeEach(() => {
        dbStub = sinon.stub(db);
        commentRepositoryStub = sinon.stub(commentRepository);
    });

    afterEach(() => {
        dbStub.restore();
        commentRepositoryStub.restore();
    });

    describe('.all', () => {
        it('should return a list of posts', async () => {
            const expectedPosts = [/* Define expected posts here */];
            dbStub.all.yields(null, expectedPosts);

            const posts = await ForumRepository.all();

            expect(posts).to.deep.equal(expectedPosts);
        });

        it('should reject with an error if there is a database error', async () => {
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(ForumRepository.all()).to.be.rejectedWith(expectedError);
        });
    });

    describe('.get', () => {
        it('should return a post by ID', async () => {
            const expectedPost = { /* Define expected post here */ };
            const postId = 123; // Replace with a valid post ID
            dbStub.all.withArgs(/* ... */).yields(null, expectedPost);

            const post = await ForumRepository.get(postId);

            expect(post).to.deep.equal(expectedPost);
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 123; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(ForumRepository.get(postId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.insert', () => {
        it('should insert a new post', async () => {
            const post = { /* Define post object here */ };
            dbStub.run.yields(null, { lastID: 1 });

            const postId = await ForumRepository.insert(post);

            expect(postId).to.equal(1);
        });

        it('should reject with an error if there is a database error', async () => {
            const post = { /* Define post object here */ };
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.insert(post)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.update', () => {
        it('should update a post', async () => {
            const post = { /* Define post object here */ };
            dbStub.run.yields(null);

            await expect(ForumRepository.update(post)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const post = { /* Define post object here */ };
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.update(post)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.delete', () => {
        it('should delete a post and its associated comments', async () => {
            const postId = 123; // Replace with a valid post ID
            commentRepositoryStub.deleteAllByPost.resolves(); // Mock the method from CommentRepository
            dbStub.run.yields(null);

            await expect(ForumRepository.delete(postId)).to.be.fulfilled;

            expect(commentRepositoryStub.deleteAllByPost.calledOnceWith(postId)).to.be.true;
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 123; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            commentRepositoryStub.deleteAllByPost.resolves(); // Mock the method from CommentRepository
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.delete(postId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_like', () => {
        it('should increment likes for a post', async () => {
            const postId = 123; // Replace with a valid post ID
            dbStub.run.yields(null);

            await expect(ForumRepository.add_like(postId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 123; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.add_like(postId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_dislike', () => {
        it('should increment dislikes for a post', async () => {
            const postId = 123; // Replace with a valid post ID
            dbStub.run.yields(null);

            await expect(ForumRepository.add_dislike(postId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 123; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.add_dislike(postId)).to.be.rejectedWith(expectedError);
        });
    });
});
