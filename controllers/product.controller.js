const ProductModel = require("../models/Product.model");

async function fetchProducts(req, res) {
  try {
    // find method is mongoose method which fetch all data without any filter
    // find returns a promise, so using await
    const data = await ProductModel.find();

    // Check if no products are found.
    if (!data || data.length === 0) {
      // If the collection is empty, send a 404 Not Found status.
      return res.status(404).json({
        message: "No products found in the database.",
      });
    }

    // if data is found sending it
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data." });
  }
}

async function fetchProductById(req, res) {
  try {
    const { id } = req.params;
    let data = await ProductModel.findById(id);

    if (!data) {
      // If the collection is empty, send a 404 Not Found status.
      return res.status(404).json({
        message: `No products found in the database with id ${id}`,
      });
    }

    // if data is found sending it
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data." });
  }
}

module.exports = {
  fetchProducts,
  fetchProductById
};
