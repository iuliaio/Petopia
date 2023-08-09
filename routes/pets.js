const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");
const petsRepository=require('../repositories/petsRepository');
router.get("/", petsController.index);
router.get("/search", petsController.search);

router.get("/profile/:id", petsController.profile);


router.post("/new", petsController.new_pet);
router.put("/edit/:pet", petsController.edit_pet);
router.delete('/profile/:id/delete',petsController.delete_pet);

module.exports = router;
