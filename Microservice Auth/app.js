const express = require("express");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
