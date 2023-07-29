const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");
router.get("/", petsController.index);
router.get("/search", petsController.search);
router.get("/filter", petsController.filter);
router.get("/profile", petsController.profile);
router.get("/new", petsController.new);
router.get("/edit/:pet", petsController.edit);
router.post("/new", petsController.new_pet);
router.post("/edit/:pet", petsController.edit_pet);

module.exports = router;
