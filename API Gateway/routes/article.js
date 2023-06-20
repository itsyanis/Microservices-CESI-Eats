const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();

// Create an article
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.articleMicroserviceURL}/articles`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all articles
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${config.articleMicroserviceURL}/articles`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving articles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all restaurant's articles
router.get("/restaurant/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.articleMicroserviceURL}/articles/restaurant/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving articles:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get an article by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.articleMicroserviceURL}/articles/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Update an article
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, type } = req.body;
    const response = await axios.put(
      `${config.articleMicroserviceURL}/articles/${id}`,
      {
        name,
        description,
        price,
        type,
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete an article
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.articleMicroserviceURL}/articles/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting article:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
