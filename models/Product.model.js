const mongoose = require("mongoose");

// It define the blueprint (Schema) for our Product collection.
// This defines the structure and data types of each document (row) in the Products collection.
const productSchema = new mongoose.Schema({
    // Name of the product. It must be a String.
    name: {
        type: String,
        required: true, // This means a product MUST have a name.
        trim: true      // Removes whitespace from both ends of a string.
    },
    // Price of the product (e.g., 500). It must be a Number.
    price: {
        type: Number,
        required: true,
        min: 0          // Price cannot be less than 0.
    },
    // Description of the product.
    description: {
        type: String,
        default: "No description provided." // If no description is given, use this default.
    },
    // Number of units available in stock.
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0          // Stock cannot be negative.
    }
}, { 
    // This second object is for options. timestamps: true automatically adds 
    // createdAt and updatedAt fields to track when the document was created/updated.
    timestamps: true 
});

// 3. We create the Model (a class-like structure) from the Schema.
// 'Products' is the name of the collection in MongoDB.
const ProductModel = mongoose.model('Products', productSchema);

// 4. We export the model so other files (like controllers) can use it to interact with the DB.
module.exports = ProductModel;