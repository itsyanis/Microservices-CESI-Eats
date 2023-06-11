const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();

// Create a menu
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.menuMicroserviceURL}/menu`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating menu:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all menu
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${config.menuMicroserviceURL}/menu`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving menus:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get a menu by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.menuMicroserviceURL}/menu/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving menu:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Update an menu
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, items } = req.body;
    const response = await axios.put(
      `${config.menuMicroserviceURL}/menu/${id}`,
      {
        customerId,
        items,
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating menu :", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete an menu
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.menuMicroserviceURL}/menu/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting menu:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
