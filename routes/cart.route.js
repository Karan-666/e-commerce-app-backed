// importing verify token middleware
const verifyToken = require("../middleware/verifyToken");

// Import the actual logic functions (Controllers)
const {
  addItem,
  fetchCart,
  updateItem,
  removeItem,
} = require("../controllers/cart.controller");

function cartRoutes(app) {
  // CRUD operations

  // create
  // add a product
  // passing verify token middleware
  app.post("/cart", verifyToken, addItem);

  // Read
  // fetch all items in the user Cart
  app.get("/cart", verifyToken, fetchCart);

  // update
  // update items in cart
  app.put("/cart/:id", verifyToken, updateItem);

  //delete
  // delete item in cart
  app.delete("/cart/:id", verifyToken, removeItem);
}

// exporting it
module.exports = cartRoutes;
