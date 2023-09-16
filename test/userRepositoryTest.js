const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sqlite3 = require("sqlite3");
const UserRepository = require('../repositories/userRepository');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('UserRepository', () => {
    let db;
    let userRepository;
    let last_user;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        userRepository = new UserRepository(db);
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
            last_user = insertedId;
            expect(insertedId).to.be.a('number');
        });
    });

    describe('.getById', () => {
        it('should return a user by ID', async () => {
            const user = await userRepository.getById(last_user);
            expect(user).to.be.an('object');
        });
    });

    describe('.all', () => {
        it('should return a list of users', async () => {
            const users = await userRepository.all();
            expect(users).to.be.an('array');
        });
    });

    describe('.getByEmailPassword', () => {
        it('should return a user by email and password', async () => {
            const userCredentials = {email: 'ben@email.com', password: 'password'};
            const user = await userRepository.getByEmailPassword(userCredentials);
            expect(user).to.be.an('object');
        });
    });

    describe('.update', () => {
        it('should update a user', async () => {
            const updatedUser = {
                first_name: "",
                last_name: "",
                phone: "+447975777666",
                email: "ben@email.com",
                password: "password",
                profile_picture: "profile_image.jpg",
                charity_name: "Animal Shelter",
                charity_id: "AH123",
                description: "A shelter NOT dedicated to rescuing and caring for animals in need. >:)",
                country: "Scotland",
                county: "Ayrshire ",
                zip_code: "SW1W 0NY",
                address: "123 Pet Street",
                created_at: "2023-08-11"
            };
            const updatedId = await userRepository.update(updatedUser);
            expect(updatedId).to.be.a('number');
        });
    });

    describe('.delete', () => {
        it('should delete a user', async () => {
            const deletedId = await userRepository.delete(last_user);
            expect(deletedId).to.be.a('number');
        });
    });
});
