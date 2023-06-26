const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();

// Create an restauran
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.restaurantMicroserviceURL}/restaurant`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${config.restaurantMicroserviceURL}/restaurant`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving restaurants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get an restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Update an restaurant
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, items } = req.body;
    const response = await axios.put(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`,
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
      console.error("Error updating restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete a restaurant
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.restaurantMicroserviceURL}/restaurant/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting restaurant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
