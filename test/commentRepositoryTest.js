const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const CommentRepository = require('../repositories/commentRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('CommentRepository', () => {
    let dbStub;

    beforeEach(() => {
        dbStub = sinon.stub(db);
    });

    afterEach(() => {
        dbStub.restore();
    });

    describe('.delete', () => {
        it('should delete a comment', async () => {
            const commentId = 123; // Replace with a valid comment ID
            dbStub.run.yields(null);

            await expect(CommentRepository.delete(commentId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const commentId = 123; // Replace with a valid comment ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.delete(commentId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.deleteAllByPost', () => {
        it('should delete all comments for a post', async () => {
            const postId = 456; // Replace with a valid post ID
            dbStub.run.yields(null);

            await expect(CommentRepository.deleteAllByPost(postId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 456; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.deleteAllByPost(postId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.update', () => {
        it('should update a comment', async () => {
            const comment = { /* ... */ }; // Define the comment data here
            dbStub.run.yields(null);

            await expect(CommentRepository.update(comment)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const comment = { /* ... */ }; // Define the comment data here
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.update(comment)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_like', () => {
        it('should increment likes for a comment', async () => {
            const commentId = 123; // Replace with a valid comment ID
            dbStub.run.yields(null);

            await expect(CommentRepository.add_like(commentId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const commentId = 123; // Replace with a valid comment ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.add_like(commentId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.add_dislike', () => {
        it('should increment dislikes for a comment', async () => {
            const commentId = 123; // Replace with a valid comment ID
            dbStub.run.yields(null);

            await expect(CommentRepository.add_dislike(commentId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const commentId = 123; // Replace with a valid comment ID
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.add_dislike(commentId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.allByPost', () => {
        it('should return all comments for a post', async () => {
            const expectedComments = [/* ... */]; // Define your expected comments here
            const postId = 789; // Replace with a valid post ID
            dbStub.all.yields(null, expectedComments);

            const comments = await CommentRepository.allByPost(postId);

            expect(comments).to.deep.equal(expectedComments);
        });

        it('should reject with an error if there is a database error', async () => {
            const postId = 789; // Replace with a valid post ID
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(CommentRepository.allByPost(postId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.insert', () => {
        it('should insert a new comment', async () => {
            const comment = { /* ... */ }; // Define the comment data here
            dbStub.run.yields(null);

            await expect(CommentRepository.insert(comment)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const comment = { /* ... */ }; // Define the comment data here
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(CommentRepository.insert(comment)).to.be.rejectedWith(expectedError);
        });
    });
});
