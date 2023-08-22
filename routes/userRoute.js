const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const UserRepository = require("../repositories/userRepository")

const userRepository = new UserRepository(db)
const userController = new UserController(userRepository)

router.get("/", userController.index.bind(userController));

router.get("/login", userController.login.bind(userController));

router.post("/login", userController.authenticate.bind(userController));

// TODO: Anand
router.get("/shelter/register", userController.shelterRegister.bind(userController));

// TODO: Anand
router.post("/shelter/register", userController.shelterStore.bind(userController));

// TODO: Anand
router.get("/adopter/register", userController.adopterRegister.bind(userController));

// TODO: Anand
router.post("/adopter/register", userController.adopterStore.bind(userController));

router.get("/edit", userController.edit.bind(userController));

router.post("/edit", userController.update.bind(userController));

router.get("/logout", userController.logout.bind(userController));

module.exports = router;
