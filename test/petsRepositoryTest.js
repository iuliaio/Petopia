const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const PetsRepository = require('../repositories/petsRepository');
const sqlite3 = require("sqlite3");

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('PetsRepository', () => {
    let db;
    let petsRepository;
    let lastID;

    before(() => {
        db = new sqlite3.Database("./database_test.db");
        petsRepository = new PetsRepository(db);
    });

    describe('.insert', () => {
        it('should insert a new pet', async () => {
            const pet_data = {
                name: "Max",
                species: "Dog",
                breed: "Cute",
                age: "2",
                gender: "male",
                size: "medium",
                color: "black",
                weight: "16 kg",
                description: "Very sweet",
                vaccination_status: "Fully vaccinated",
                neutered: "no",
                health_condition: "Healthy",
                personality_traits: "Courageous",
                user_id: 1
            };
            const inserted_id = await petsRepository.insert(pet_data);
            lastID = inserted_id
            expect(inserted_id).to.be.a('number');
        });
    });

    describe('.all', () => {
        it('should return a list of pets', async () => {
            const posts = await petsRepository.all({});
            expect(posts).to.be.an('array');
        });
    });

    describe('.get', () => {
        it('should return a pet by ID', async () => {
            const pet = await petsRepository.get(lastID);
            expect(pet).to.be.an('object');
        });
    });

    describe('.update', () => {
        it('should update a pet', async () => {
            const pet_data = {
                id: 1,
                name: "Bob",
                species: "Dog",
                breed: "Cute",
                age: "2",
                gender: "male",
                size: "medium",
                color: "black",
                weight: "16 kg",
                description: "Very sweet",
                vaccination_status: "Fully vaccinated",
                neutered: "no",
                health_condition: "Healthy",
                personality_traits: "Courageous"
            };
            const updated_id = await petsRepository.update(pet_data);
            expect(updated_id).to.be.a('number');
        });
    });

    describe('.delete', () => {
        it('should delete a pet', async () => {
            const pet_id = 1;
            const deleted_id = await petsRepository.delete(pet_id);
            expect(deleted_id).to.be.a('number');
        });
    });
});
