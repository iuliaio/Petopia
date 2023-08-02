const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

// This route will return a view for the user to select what type of account they need
router.get("/", authenticationController.index);

// This route will return a view for login
router.get("/login", authenticationController.login);

// This is the route where the credentials will be submitted
router.post("/login", authenticationController.authenticate);

// This route will return a view for a shelter to register
router.get("/shelter/register", authenticationController.shelterRegister);

// This is the route where the shelter information will be submitted to
router.post("/shelter/register", authenticationController.shelterStore);

// This route will return a view for a shelter to register
router.get("/adopter/register", authenticationController.adopterRegister);

// This is the route where the shelter information will be submitted to
router.post("/adopter/register", authenticationController.adopterStore);

// This is the route where a user will edit his details
router.get("/edit", authenticationController.edit);

// This is the route where a user will send the information to update.
router.post("/edit", authenticationController.update)

// This route will log out the authenticated user
router.get("/logout", authenticationController.logout)

module.exports = router;
