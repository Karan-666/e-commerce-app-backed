

// Import Mongoose to define the schema and access the ObjectId type.
const mongoose = require("mongoose");

// Define the Cart Schema. This represents a single item entry in a user's cart.
const cartSchema = new mongoose.Schema({
    // A reference to the User who added this item. This links the item to a user.
    userId: {
        type: mongoose.Schema.Types.ObjectId, // The data type for MongoDB IDs.
        ref: 'Users',                       // The name of the collection this ID refers to (from User.model.js).
        required: true
    },
    // A reference to the Product being added.
    productId: {
        type: mongoose.Schema.Types.ObjectId, // The data type for MongoDB IDs.
        ref: 'Products',                    // The name of the collection this ID refers to (from Product.model.js).
        required: true
    },
    // The number of this product the user wants.
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1                              // Quantity must be at least 1.
    }
}, { 
    // Add timestamps for tracking creation/update time.
    timestamps: true 
});

// 3. Create the Model (Collection name will be 'Carts').
const CartModel = mongoose.model('Carts', cartSchema);

// 4. Export the model.
module.exports = CartModel;