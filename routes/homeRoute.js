const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/homeController");
const homeController = new HomeController()

router.get("/", homeController.index);

module.exports = router;
