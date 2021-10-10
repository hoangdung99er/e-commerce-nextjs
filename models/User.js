const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isFavorite: [
      { type: mongoose.Types.ObjectId, ref: "Product", required: false },
    ],
    isCart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
