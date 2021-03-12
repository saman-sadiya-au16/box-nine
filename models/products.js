const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: String,
      default: "Main_course",
      enum: ["Main_course", "Beverages", "Desserts"]
    },
    uploadImageUrl: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
