const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  userId: Number,
  deliveryNumber: Number,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },owner: Number,
  name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
  status: String,
  image: String,
  opening: String,
  closing: String,
  tags: Array,
  description: String,
  menus: Array,
  article: Array,
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports = Restaurant;