const express = require("express");
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", authMiddleware, createBook); // Admin only (TODO: add role check)
router.put("/:id", authMiddleware, updateBook); // Admin only
router.delete("/:id", authMiddleware, deleteBook); // Admin only

module.exports = router;
