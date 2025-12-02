const Favorite = require("../models/Favorite");
const Book = require("../models/Book");

// Get all favorites untuk user
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId }).populate("bookId");

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites.map((fav) => fav.bookId),
    });
  } catch (error) {
    next(error);
  }
};

// Add to favorites
const addFavorite = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    // Cek apakah buku ada
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Cek apakah sudah ada di favorites
    const existingFavorite = await Favorite.findOne({ userId: req.userId, bookId });
    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Book already in favorites",
      });
    }

    const favorite = await Favorite.create({
      userId: req.userId,
      bookId,
    });

    res.status(201).json({
      success: true,
      message: "Book added to favorites",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

// Remove from favorites
const removeFavorite = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      userId: req.userId,
      bookId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book removed from favorites",
    });
  } catch (error) {
    next(error);
  }
};

// Check if book is favorited
const isFavorited = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const favorite = await Favorite.findOne({ userId: req.userId, bookId });

    res.status(200).json({
      success: true,
      isFavorited: !!favorite,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite, isFavorited };
