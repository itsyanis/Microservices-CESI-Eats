require("dotenv").config();

const express = require("express");
const { connect } = require("./database/connect");
const orderRouter = require("./routes/order");

const app = express();
app.use(express.json());

connect();

app.use("/orders", orderRouter);

app.listen(process.env.PORT, () => {
  console.log("En attente de requêtes sur le port :", process.env.PORT);
});
