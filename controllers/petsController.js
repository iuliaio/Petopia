// Import required modules
const pets = require("../repositories/petsRepository");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

// Define a controller class for managing pet-related operations
class PetsController {
  // Retrieve a list of random pets
  static index(req, res) {
    const selectQuery = "SELECT * FROM pets ORDER BY RANDOM() LIMIT 10";

    // Execute SQL query to retrieve random pets
    db.all(selectQuery, (err, pets) => {
      if (err) {
        console.error("Error retrieving random pets:", err.message);
        return res.status(500).json({ error: "Failed to retrieve random pets" });
      }

      // Respond with the retrieved pets
      return res.status(200).json(pets);
    });
  }

  // Search for pets based on specified criteria
  static search(req, res) {
    const { species_id, breed_id, age, gender, size, color } = req.query;

    let query = "SELECT * FROM pets WHERE 1=1";
    const queryParams = [];

    // Build SQL query dynamically based on provided search parameters
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

    // Execute SQL query with the specified parameters
    db.all(query, queryParams, (err, pets) => {
      if (err) {
        console.error("Error searching for pets:", err.message);
        return res.status(500).json({ error: "Failed to search for pets" });
      }
      // Respond with the searched pets
      return res.status(200).json(pets);
    });
  }

  // Retrieve the profile of a specific pet
  static profile(req, res) {
    const petId = req.params.id;

    const selectQuery = "SELECT * FROM pets WHERE id = ?";

    // Execute SQL query to retrieve pet profile by ID
    db.get(selectQuery, petId, (err, pet) => {
      if (err) {
        console.error("Error retrieving pet profile:", err.message);
        return res.status(500).json({ error: "Failed to retrieve pet profile" });
      }

      // Respond with the retrieved pet profile
      if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
      }

      return res.status(200).json(pet);
    });
  }

  // Add a new pet to the database
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

    // Define SQL query to insert a new pet
    const insertQuery = `INSERT INTO pets (name, species_id, breed_id, age, gender, size, color, weight, description, 
      vaccination_status, neutered, health_condition, personality_traits, available, user_id, born_at, profile_photo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute SQL query to insert a new pet
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
        // Log successful addition of a new pet
        console.log(`A new pet has been added with ID ${this.lastID}`);
        return res.status(201).json({ message: "New pet added successfully" });
      }
    );
  }

  // Update the information of an existing pet
  static edit_pet(req, res) {
    const petId = req.params.id;
    const updatedPet = req.body;

    // Define SQL query to update pet information by ID
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

    // Execute SQL query to update pet information
    db.run(updateQuery, queryParams, function (err) {
      if (err) {
        console.error("Error updating pet:", err.message);
        return res.status(500).json({ error: "Failed to update pet" });
      }

      // Respond based on whether the pet was found and updated
      if (this.changes === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      console.log(`Updated pet with ID ${petId}`);
      return res.status(204).send();
    });
  }

  // Delete a pet from the database
  static delete_pet(req, res) {
    const db = new sqlite3.Database("pets.db");

    const petId = req.params.id;

    // Define SQL query to delete a pet by ID
    const deleteQuery = "DELETE FROM pets WHERE id = ?";

    // Execute SQL query to delete a pet
    db.run(deleteQuery, petId, function (err) {
      if (err) {
        console.error("Error deleting pet:", err.message);
        return res.status(500).json({ error: "Failed to delete pet" });
      }

      // Respond based on whether the pet was found and deleted
      if (this.changes === 0) {
        return res.status(404).json({ error: "Pet not found" });
      }

      console.log(`Deleted pet with ID ${petId}`);
      return res.status(204).send();
    });
  }
}

// Export the PetsController class to be used in other modules
module.exports = PetsController;
