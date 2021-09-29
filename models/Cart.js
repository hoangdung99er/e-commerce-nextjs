const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          id: { type: String },
          title: { type: String },
          desc: { type: String },
          img: { type: String },
          categories: { type: Array },
          size: { type: String },
          color: { type: String },
          price: { type: Number },
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
