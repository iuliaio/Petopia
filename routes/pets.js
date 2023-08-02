const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");
const petsRepository=require('../repositories/petsRepository');
router.get("/", petsController.index);
router.get("/search", petsController.search);
router.post("/search",petsController.search);
router.get("/profile/:id", petsController.profile);
router.get("/new", petsController.new);
router.get("/edit/:pet", petsController.edit);
router.post("/new", petsController.new_pet);
router.post("/edit/:pet", petsController.edit_pet);
router.delete('/profile/:id/delete',petsController.delete_pet);

module.exports = router;
