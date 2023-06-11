require("dotenv").config();

module.exports = {
  authMicroserviceURL: "http://localhost:4000",
  orderMicroserviceURL: "http://localhost:5000",
  menuMicroserviceURL: "http://localhost:8000",
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
