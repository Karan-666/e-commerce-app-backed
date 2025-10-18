
const {fetchProducts , fetchProductById} = require('../controllers/product.controller');

function productRoutes(app){
    // GET /products: Route to fetch the list of all products.
    app.get('/products', fetchProducts); // fetchProducts is the logic function (Controller)
    
    // GET /products/:id: Route to fetch a single product by its ID.
    // The ':id' is a dynamic parameter that Express will capture.
    app.get('/products/:id', fetchProductById); // fetchProductById is the logic function (Controller)
}

module.exports = productRoutes;