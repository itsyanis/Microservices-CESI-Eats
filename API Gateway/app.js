const express = require("express");
const verifyToken = require("./middlewares/authMiddleware");

const bodyParser = require("body-parser");

// Microservice routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const articleRoutes = require("./routes/article");

const app = express();
app.use(bodyParser.json());

// Route handling
app.use("/auth", authRoutes);
app.use("/restaurant", articleRoutes);
app.use("/orders", verifyToken, orderRoutes);
app.use("/menu", verifyToken, orderRoutes);
app.use("/articles", verifyToken, articleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
