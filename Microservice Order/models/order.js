const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: Number,
  deliveryNumber: Number,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  address: String,
  created: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  accepted: {
    type: Boolean,
    default: null,
  },

  price: {
    type: Number,
    required: true,
  },
  menus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  ],
  article: Array,
});

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
