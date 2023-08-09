const pets = require("../repositories/petsRepository");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

class PetsController {
  static index(req, res) {
    const selectQuery = "SELECT * FROM pets ORDER BY RANDOM() LIMIT 10";

    db.all(selectQuery, (err, pets) => {
      if (err) {
        console.error("Error retrieving random pets:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to retrieve random pets" });
      }

      return res.status(200).json(pets);
    });
  }

  static search(req, res) {
    const { species_id, breed_id, age, gender, size, color } = req.query;

    let query = "SELECT * FROM pets WHERE 1=1";
    const queryParams = [];

    if (species_id) {
      query += " AND species_id = ?";
      queryParams.push(species_id);
    }
    if (breed_id) {
      query += " AND breed_id = ?";
      queryParams.push(breed_id);
    }
    if (age) {
      query += " AND age = ?";
      queryParams.push(age);
    }
    if (gender) {
      query += " AND gender = ?";
      queryParams.push(gender);
    }
    if (size) {
      query += " AND size = ?";
      queryParams.push(size);
    }
    if (color) {
      query += " AND color = ?";
      queryParams.push(color);
    }

    db.all(query, queryParams, (err, pets) => {
      if (err) {
        console.error("Error searching for pets:", err.message);
        return res.status(500).json({ error: "Failed to search for pets" });
      }
      return res.status(200).json(pets);
    });
  }

  static profile(req, res) {
    const petId = req.params.id;

    const selectQuery = "SELECT * FROM pets WHERE id = ?";

    db.get(selectQuery, petId, (err, pet) => {
      if (err) {
        console.error("Error retrieving pet profile:", err.message);
        return res
          .status(500)
          .json({ error: "Failed to retrieve pet profile" });
      }

      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.status(200).json(pet);
    });
  }

  static new_pet(req, res) {
    const db = new sqlite3.Database("pets.db");
    const {
      name,
      species_id,
      breed_id,
      age,
      gender,
      size,
      color,
      weight,
      description,
      vaccination_status,
      neutered,
      health_condition,
      personality_traits,
      available,
      user_id,
      born_at,
      profile_photo,
    } = req.body;
    // Insert new pet into the 'pets' table
    const insertQuery = `INSERT INTO pets (name, species_id, breed_id, age, gender, size, color, weight, description, 
  vaccination_status, neutered, health_condition, personality_traits, available, user_id, born_at, profile_photo) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
      insertQuery,
      [
        name,
        species_id,
        breed_id,
        age,
        gender,
        size,
        color,
        weight,
        description,
        vaccination_status,
        neutered,
        health_condition,
        personality_traits,
        available,
        user_id,
        born_at,
        profile_photo,
      ],
      function (err) {
        if (err) {
          console.error("Error inserting pet:", err.message);
          return res.status(500).json({ error: "Failed to add new pet" });
        }
        console.log(`A new pet has been added with ID ${this.lastID}`);
        return res.status(201).json({ message: "New pet added successfully" });
      }
    );
  }

  static edit_pet(req, res) {
    const petId = req.params.id;
    const updatedPet = req.body;

    const updateQuery = `
    UPDATE pets
    SET name = ?,
        species_id = ?,
        breed_id = ?,
        age = ?,
        gender = ?,
        size = ?,
        color = ?,
        weight = ?,
        description = ?,
        vaccination_status = ?,
        neutered = ?,
        health_condition = ?,
        personality_traits = ?,
        available = ?,
        user_id = ?,
        born_at = ?,
        profile_photo = ?
    WHERE id = ?`;

    const queryParams = [
      updatedPet.name,
      updatedPet.species_id,
      updatedPet.breed_id,
      updatedPet.age,
      updatedPet.gender,
      updatedPet.size,
      updatedPet.color,
      updatedPet.weight,
      updatedPet.description,
      updatedPet.vaccination_status,
      updatedPet.neutered,
      updatedPet.health_condition,
      updatedPet.personality_traits,
      updatedPet.available,
      updatedPet.user_id,
      updatedPet.born_at,
      updatedPet.profile_photo,
      petId,
    ];

    db.run(updateQuery, queryParams, function (err) {
      if (err) {
        console.error("Error updating pet:", err.message);
        return res.status(500).json({ error: "Failed to update pet" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      console.log(`Updated pet with ID ${petId}`);
      return res.status(204).send();
    });
  }

  static delete_pet(req, res) {
    const db = new sqlite3.Database("pets.db");

    //app.delete('/deletePet/:id', (req, res) => {
    const petId = req.params.id;

    const deleteQuery = "DELETE FROM pets WHERE id = ?";

    db.run(deleteQuery, petId, function (err) {
      if (err) {
        console.error("Error deleting pet:", err.message);
        return res.status(500).json({ error: "Failed to delete pet" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      console.log(`Deleted pet with ID ${petId}`);
      return res.status(204).send();
    });
  }
}

module.exports = PetsController;
