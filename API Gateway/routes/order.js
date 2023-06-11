const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();

// Create an order
router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${config.orderMicroserviceURL}/orders`,
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${config.orderMicroserviceURL}/orders`);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get an order by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.orderMicroserviceURL}/orders/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Update an order
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, items } = req.body;
    const response = await axios.put(
      `${config.orderMicroserviceURL}/orders/${id}`,
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
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete an order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.orderMicroserviceURL}/orders/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
