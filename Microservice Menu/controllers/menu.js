const Menu = require("../models/menu");

// Get all menu
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get specific menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a menu
exports.createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    const validationError = menu.validateSync();
    if (validationError) {
      const errors = Object.keys(validationError.errors).map(
        (key) => validationError.errors[key].message
      );
      return res.status(400).json({ errors });
    }
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a menu
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a menu
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndRemove(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
