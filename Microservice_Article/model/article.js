const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  image: String,

  description: String,

  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
