const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    }, filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage})

const PetsRepository = require('../repositories/petsRepository');
const PetsController = require("../controllers/petsController");

const petsRepository = new PetsRepository(db)
const petsController = new PetsController(petsRepository)

router.get("/", requireLogin, petsController.index.bind(petsController));
router.get("/:id", requireLogin, petsController.show.bind(petsController));

router.get("/:id/wish", requireLogin, petsController.wish.bind(petsController));
router.get("/:id/request", requireLogin, petsController.request.bind(petsController));

router.post("/store", upload.single('profile_photo'), petsController.store.bind(petsController));

module.exports = router;
