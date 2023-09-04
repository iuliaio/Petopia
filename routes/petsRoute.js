const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

const PetsRepository = require('../repositories/petsRepository');
const PetsController = require("../controllers/petsController");

const petsRepository = new PetsRepository(db)
const petsController = new PetsController(petsRepository)

router.get("/", requireLogin, petsController.index.bind(petsController));
router.get("/:id", requireLogin, petsController.show.bind(petsController));

router.post("/store", requireLogin, petsController.store.bind(petsController));

module.exports = router;
