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
            const expectedPosts = [/* ... */]; // Define your expected posts here
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
            const expectedPost = { /* ... */ }; // Define your expected post here
            const postId = 123; // Replace with a valid post ID
            dbStub.all.withArgs(/* ... */).yields(null, expectedPost); // Replace the args as needed

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

    describe('.delete', () => {
        it('should delete a post and its associated comments', async () => {
            const postId = 123; // Replace with a valid post ID
            commentRepositoryStub.deleteAllByPost.resolves(); // Mocking the method from CommentRepository
            dbStub.run.yields(null);

            await expect(ForumRepository.delete(postId)).to.be.fulfilled;

            expect(commentRepositoryStub.deleteAllByPost.calledOnceWith(postId)).to.be.true;
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 123; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            commentRepositoryStub.deleteAllByPost.resolves(); // Mocking the method from CommentRepository
            dbStub.run.yields(expectedError);

            await expect(ForumRepository.delete(postId)).to.be.rejectedWith(expectedError);
        });
    });
});
