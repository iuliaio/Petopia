const express = require("express");
const router = express.Router();

const PetsController = require("../controllers/petsController");
const PetsRepository = require('../repositories/petsRepository');

const petsRepository = new PetsRepository(db)
const petsController = new PetsController(petsRepository)

router.get("/", petsController.index);
router.get("/:id", petsController.profile);
router.get("/create", petsController.create);
router.post("/store", petsController.store);
router.get("/:id/update", petsController.edit);
router.post("/:id/update", petsController.update);
router.post('/:id/delete', petsController.delete);

module.exports = router;
