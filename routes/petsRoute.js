const express = require("express");
const router = express.Router();

const PetsRepository = require('../repositories/petsRepository');
const PetsController = require("../controllers/petsController");

const petsRepository = new PetsRepository(db)
const petsController = new PetsController(petsRepository)

router.get("/", petsController.index.bind(petsController));
router.get("/:id", petsController.show.bind(petsController));


router.post("/store", petsController.store.bind(petsController));

module.exports = router;
