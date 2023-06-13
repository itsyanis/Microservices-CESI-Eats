const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant");

// Obtenir tous les menus
router.get("/", restaurantController.getAllRestaurants);

// Obtenir un menu par ID
router.get("/:id", restaurantController.getRestaurantById);

// Créer un nouveau menu
router.post("/", restaurantController.createRestaurant);

// Mettre à jour un menu
router.patch("/:id", restaurantController.updateRestaurant);

// Supprimer un menu
router.delete("/:id", restaurantController.deleteRestaurant);

module.exports = router;
