const express = require("express");
const axios = require("axios");
const config = require("../config");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const response = await axios.post(
      `${config.authMicroserviceURL}/auth/register`,
      {
        name,
        email,
        password,
      }
    );

    // Renvoie la réponse du microservice d'authentification
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(
      `${config.authMicroserviceURL}/auth/login`,
      {
        email,
        password,
      }
    );

    // Renvoie la réponse du microservice d'authentification
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
