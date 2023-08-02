const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// This route will return a view for the user to select what type of account they need
router.get("/", userController.index);

// This route will return a view for login
router.get("/login", userController.login);

// This is the route where the credentials will be submitted
router.post("/login", userController.authenticate);

// This route will return a view for a shelter to register
router.get("/shelter/register", userController.shelterRegister);

// This is the route where the shelter information will be submitted to
router.post("/shelter/register", userController.shelterStore);

// This route will return a view for a shelter to register
router.get("/adopter/register", userController.adopterRegister);

// This is the route where the shelter information will be submitted to
router.post("/adopter/register", userController.adopterStore);

// This is the route where a user will edit his details
router.get("/edit", userController.edit);

// This is the route where a user will send the information to update.
router.post("/edit", userController.update)

// This route will log out the authenticated user
router.get("/logout", userController.logout)

module.exports = router;
