const express = require("express");
const { getFavorites, addFavorite, removeFavorite, isFavorited } = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // Semua route favorites butuh auth

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:bookId", removeFavorite);
router.get("/check/:bookId", isFavorited);

module.exports = router;
