const Article = require("../model/article"); // Utilisez le bon chemin pour le modèle

// Opération de création d'un nouvel article
exports.createArticle = async (req, res) => {
  try {
    const { restaurantId, name, image, description, price, type } = req.body;

    const newArticle = new Article({
      restaurantId,                 
      name,
      image,
      description,
      price,
      type,
    });

    console.log(newArticle);
    const savedArticle = await newArticle.save();

    res.status(201).json({
      message: "Nouvel article créé avec succès",
      article: savedArticle,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'article" });
  }
};

// Opération de lecture de tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().select(
      "name image description price"
    );

    res.status(200).json({ articles });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

// Récupérer tous les articles d'un restaurant spécifique
exports.getAllArticlesFromRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const articles = await Article.find({ restaurantId });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Opération de lecture d'un article par son identifiant
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({ article });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'article" });
  }
};

// Opération de mise à jour d'un article par son identifiant
exports.updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, price, type } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        name,
        image,
        description,
        price,
        type,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({
      message: "Article mis à jour avec succès",
      article: updatedArticle,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'article" });
  }
};

// Opération de suppression d'un article par son identifiant
exports.deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'article" });
  }
};
