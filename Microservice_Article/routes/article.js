const express = require("express");
const router = express.Router();
const articleController = require("../controller/article"); // Utilisez le bon chemin pour le contrôleur

// Route pour créer un nouvel article
router.post("/", articleController.createArticle);

// Route pour obtenir tous les articles
router.get("/", articleController.getAllArticles);

// Obtenir tous les articles d'un restaurant spécifique
router.get(
  "/restaurant/:restaurantId",
  articleController.getAllArticlesFromRestaurant
);

// Route pour obtenir un article par son ID
router.get("/:id", articleController.getArticleById);

// Route pour mettre à jour un article
router.put("/:id", articleController.updateArticleById);

// Route pour supprimer un article
router.delete("/:id", articleController.deleteArticleById);

module.exports = router;
