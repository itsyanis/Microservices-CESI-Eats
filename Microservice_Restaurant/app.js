require("dotenv").config();

const express = require("express");
const { connect } = require("./database/connect");
const restaurantRouter = require("./routes/restaurant");

const app = express();
app.use(express.json());

connect();

app.use("/restaurant", restaurantRouter);

app.listen(process.env.PORT, () => {
  console.log("En attente de requêtes sur le port :", process.env.PORT);
});