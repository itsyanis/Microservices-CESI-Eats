require("dotenv").config();

const express = require("express");
const { connect } = require("./database/connect");
const menuRouter = require("./routes/menu");

const app = express();
app.use(express.json());

connect();

app.use("/menu", menuRouter);

app.listen(process.env.PORT, () => {
  console.log("En attente de requêtes sur le port :", process.env.PORT);
});
