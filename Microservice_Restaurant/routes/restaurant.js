const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant");

// Obtenir tous les restaurants
router.get("/", restaurantController.getAllRestaurants);

// Obtenir un restaurant par ID
router.get("/:id", restaurantController.getRestaurantById);

// Obtenir un restaurant par ID Owner
router.get("/owner/:ownerId", restaurantController.getRestaurantsByOwner);

// Créer un nouveau restaurant
router.post("/", restaurantController.createRestaurant);

// Mettre à jour un restaurant
router.patch("/:id", restaurantController.updateRestaurant);

// Supprimer un restaurant
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
