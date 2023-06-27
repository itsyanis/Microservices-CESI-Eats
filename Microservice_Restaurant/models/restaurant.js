const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  userId: Number,
  owner: Number,
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: String,
  image: String,
  opening: String,
  closing: String,
  tags: Array,
  description: String,
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
