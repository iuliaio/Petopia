const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sqlite3 = require("sqlite3");
const UserRepository = require('../repositories/userRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('UserRepository', () => {
    let db;
    let userRepository;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        userRepository = new UserRepository(db);
    });

    describe('.all', () => {
        it('should return a list of users', async () => {
            const users = await userRepository.all();
            expect(users).to.be.an('array');
        });
    });

    describe('.getById', () => {
        it('should return a user by ID', async () => {
            const userId = 1;
            const user = await userRepository.getById(userId);
            expect(user).to.be.an('object');
        });
    });

    describe('.getByEmailPassword', () => {
        it('should return a user by email and password', async () => {
            const userCredentials = {email: 'john@example.com', password: 'password'};
            const user = await userRepository.getByEmailPassword(userCredentials);
            expect(user).to.be.an('object');
        });
    });

    describe('.insert', () => {
        it('should insert a new user', async () => {
            const newUser = {
                first_name: "",
                last_name: "",
                phone: "+447975777666",
                email: "ben@email.com",
                password: "password",
                profile_picture: "profile_image.jpg",
                charity_name: "Animal Haven Shelter",
                charity_id: "AH123",
                description: "A shelter dedicated to rescuing and caring for animals in need.",
                country: "United Kingdom",
                county: "London",
                zip_code: "SW1W 0NY",
                address: "123 Pet Street",
                created_at: "2023-08-11"
            }
            const insertedId = await userRepository.insert(newUser);
            expect(insertedId).to.be.a('number');
        });
    });

    describe('.update', () => {
        it('should update a user', async () => {
            const updatedUser = {
                id: 123, first_name: 'Updated John', last_name: 'Updated Doe', // ... other updated user properties
            };
            const updatedId = await userRepository.update(updatedUser);
            expect(updatedId).to.be.a('number');
        });
    });

    describe('.delete', () => {
        it('should delete a user', async () => {
            const userId = 123;
            const deletedId = await userRepository.delete(userId);
            expect(deletedId).to.be.a('number');
        });
    });
});
