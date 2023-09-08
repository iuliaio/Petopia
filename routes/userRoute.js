const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')
const requireAnonymous = require('../middlewares/requireAnonymous')

const UserController = require("../controllers/userController");
const UserRepository = require("../repositories/userRepository")
const PetsRepository = require('../repositories/petsRepository')
const ChatRepository = require('../repositories/chatRepository')

const userRepository = new UserRepository(db)
const petsRepository = new PetsRepository(db)
const chatRepository = new ChatRepository(db)
const userController = new UserController(userRepository, petsRepository, chatRepository)

router.get("/login", requireAnonymous, userController.login.bind(userController));

router.post("/login", requireAnonymous, userController.authenticate.bind(userController));


router.get("/shelter/register", requireAnonymous, userController.shelterRegister.bind(userController));

router.post("/shelter/register", requireAnonymous, userController.shelterStore.bind(userController));


router.get("/adopter/register", requireAnonymous, userController.adopterRegister.bind(userController));

router.post("/adopter/register", requireAnonymous, userController.adopterStore.bind(userController));


// router.get('/account', requireLogin, userController.myAccount.bind(userController));
router.get('/account/:id?', requireLogin, userController.account.bind(userController));

router.get("/logout", requireLogin, userController.logout.bind(userController));

module.exports = router;
