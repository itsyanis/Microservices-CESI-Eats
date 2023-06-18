require("dotenv").config();

const express = require("express");
const { connect } = require("./database/connect");
const articleRouter = require("./routes/article");

const app = express();
app.use(express.json());

connect();

app.use("/articles", articleRouter);

app.listen(process.env.PORT, () => {
  console.log("En attente de requêtes sur le port :", process.env.PORT);
});
