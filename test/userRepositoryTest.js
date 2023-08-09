const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const UserRepository = require('../repositories/userRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('UserRepository', () => {
    let dbStub;

    beforeEach(() => {
        dbStub = sinon.stub(db);
    });

    afterEach(() => {
        dbStub.restore();
    });

    describe('.all', () => {
        it('should return a list of users', async () => {
            const expectedUsers = [/* ... */]; // Define your expected users here
            dbStub.all.yields(null, expectedUsers);

            const users = await UserRepository.all();

            expect(users).to.deep.equal(expectedUsers);
        });

        it('should reject with an error if there is a database error', async () => {
            const expectedError = new Error('Database error');
            dbStub.all.yields(expectedError);

            await expect(UserRepository.all()).to.be.rejectedWith(expectedError);
        });
    });

    describe('.getById', () => {
        it('should return a user by ID', async () => {
            const expectedUser = { /* ... */ }; // Define your expected user here
            const userId = 123; // Replace with a valid user ID
            dbStub.get.withArgs('SELECT * FROM users WHERE id = ?', [userId]).yields(null, expectedUser);

            const user = await UserRepository.getById(userId);

            expect(user).to.deep.equal(expectedUser);
        });

        it('should reject with an error if there is a database error', async () => {
            const userId = 123; // Replace with a valid user ID
            const expectedError = new Error('Database error');
            dbStub.get.yields(expectedError);

            await expect(UserRepository.getById(userId)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.getByEmailPassword', () => {
        it('should return a user by email and password', async () => {
            const expectedUser = { /* ... */ }; // Define your expected user here
            const user = { email: 'test@example.com', password: 'password123' };
            dbStub.get.withArgs('SELECT * FROM users WHERE email = ? AND password = ?', [user.email, user.password]).yields(null, expectedUser);

            const result = await UserRepository.getByEmailPassword(user);

            expect(result).to.deep.equal(expectedUser);
        });

        it('should reject with an error if there is a database error', async () => {
            const user = { email: 'test@example.com', password: 'password123' };
            const expectedError = new Error('Database error');
            dbStub.get.yields(expectedError);

            await expect(UserRepository.getByEmailPassword(user)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.insert', () => {
        it('should insert a new user', async () => {
            const newUser = { /* ... */ }; // Define the new user data here
            const expectedId = 123; // Replace with the expected ID after insertion
            dbStub.run.yields(null, { lastID: expectedId });

            const insertedId = await UserRepository.insert(newUser);

            expect(insertedId).to.equal(expectedId);
        });

        it('should reject with an error if there is a database error', async () => {
            const newUser = { /* ... */ }; // Define the new user data here
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(UserRepository.insert(newUser)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.update', () => {
        it('should update a user', async () => {
            const updatedUser = { /* ... */ }; // Define the updated user data here
            dbStub.run.yields(null);

            await expect(UserRepository.update(updatedUser)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const updatedUser = { /* ... */ }; // Define the updated user data here
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(UserRepository.update(updatedUser)).to.be.rejectedWith(expectedError);
        });
    });

    describe('.delete', () => {
        it('should delete a user', async () => {
            const userId = 123; // Replace with the user ID to delete
            dbStub.run.yields(null);

            await expect(UserRepository.delete(userId)).to.be.fulfilled;
        });

        it('should reject with an error if there is a database error', async () => {
            const userId = 123; // Replace with the user ID to delete
            const expectedError = new Error('Database error');
            dbStub.run.yields(expectedError);

            await expect(UserRepository.delete(userId)).to.be.rejectedWith(expectedError);
        });
    });
});
