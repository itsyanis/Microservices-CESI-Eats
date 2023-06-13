require("dotenv").config();

const mongoose = require("mongoose");
const mongodb_uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");
  } catch (err) {
    console.log("Connection failed", error);
    process.exit(-1);
  }
}

module.exports = { connect, mongoose };