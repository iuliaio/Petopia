const express = require("express");
const router = express.Router();

const PetsRepository = require('../repositories/petsRepository');
const PetsController = require("../controllers/petsController");

const petsRepository = new PetsRepository(db)
const petsController = new PetsController(petsRepository)

router.get("/", petsController.index.bind(petsController));
router.get("/:id", petsController.show.bind(petsController));
router.get("/create", petsController.create.bind(petsController));
router.post("/store", petsController.store.bind(petsController));
router.get("/:id/update", petsController.edit.bind(petsController));
router.post("/:id/update", petsController.update.bind(petsController));
router.post('/:id/delete', petsController.delete.bind(petsController));

module.exports = router;
