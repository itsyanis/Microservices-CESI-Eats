const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model("menu", menuSchema);
module.exports = Menu;
