const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
  },
  { timestamps: true }
);

// Index untuk mencegah duplicate favorite
favoriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
