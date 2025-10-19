const mongoose = require("mongoose");
const ProductModel = require("../models/Product.model");
const CartModel = require("../models/Cart.model");

async function addItem(req, res){
    try{
        // the product details from the request body.
        const { productId, quantity = 1 } = req.body;

        //Get the user ID from the JWT token (added by verifyToken middleware).
        const userId = req.user._id;

        // --- VALIDATION: Check if Product ID format is valid --- ?
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID format." });
        }

        // --- VALIDATION: Check if the Product actually exists ---
        // mongoose.Types.ObjectId.isValid(productId): This is a built-in Mongoose method that 
        // checks whether the string in productId is a valid 24-character hexadecimal ObjectId.
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found. Cannot add to cart." });
        }

        // checking if this item already exist in the user's cart? ---
        let cartItem = await CartModel.findOne({ userId: userId, productId: productId });

        if (cartItem) {
            // --- IF EXISTS: Update the quantity ---
            // Calculate the new total quantity.
            const newQuantity = cartItem.quantity + quantity;
            
            // Use findByIdAndUpdate to increment the quantity in the database.
            const updatedItem = await CartModel.findByIdAndUpdate(
                cartItem._id, 
                { quantity: newQuantity }, 
                { new: true } // {new: true} returns the updated document.
            );

            // 200 OK status for a successful update.
            return res.status(200).json({
                message: "Product quantity updated in cart.",
                item: updatedItem
            });

            } else {
            // --- IF NOT EXISTS: Create a new cart item ---
            const newItem = await CartModel.create({
                userId,
                productId,
                quantity
            });

            // 201 Created status for a new resource.
            return res.status(201).json({
                message: "Product added to cart.",
                item: newItem
            });
        }

        } catch (err) {
        // Handle server/database errors.
        console.error("Error adding item to cart:", err);
        return res.status(500).json({ message: "Error adding item to cart." });
    }
}

async function fetchCart(req, res) {
    try {
        // Get the user ID from the JWT token (from verifyToken middleware).
        const userId = req.user._id;

        // Find all cart items belonging to the user.
        let cartItems = await CartModel.find({ userId: userId })
                                        // Populate: This is like JOIN in SQL. 
                                        // It replaces the productId with the actual Product document.
                                        // so after this, product id will be like "productId": { "_id": "p101", "name": "Blue T-shirt", "price": 25.99, ... },
                                        // it works because while making cart schema we did this : ref: 'Products',     
                                        .populate('productId');

        // Check if the cart is empty.
        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({
                message: "Your cart is empty.",
                items: []
            });
        }
        
        // Send a 200 OK status with the detailed cart items.
        return res.status(200).json(cartItems);

    } catch (err) {
        console.error("Error fetching cart:", err);
        return res.status(500).json({ 
            message: "Error fetching user's cart." 
        });
    }
}

async function updateItem(req, res) {
    try {
        // Get the cart item ID from the URL and the new quantity from the body.
        const { id } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id;

        // --- VALIDATION: Check if ID format is valid ---
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Cart Item ID format." });
        }
        
        // --- VALIDATION: Check if quantity is valid ---
        if (typeof quantity !== 'number' || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be a number greater than 0." });
        }

        // Find the cart item by its ID AND the user's ID (security check).
        // Update its quantity and return the updated document.
        const updatedItem = await CartModel.findOneAndUpdate(
            // we are also passing userId as well as product id, for security, so only logged in user can update
            { _id: id, userId: userId }, // FIND criteria (use _id from params and userId from token)
            { quantity: quantity },       // UPDATE action (set the new quantity)
            { new: true }                 // OPTIONS: return the updated document.
        );

        // Check if the item was found and updated.
        if (!updatedItem) {
            // Item not found, or it doesn't belong to the logged-in user.
            return res.status(404).json({ message: "Cart item not found or does not belong to user." });
        }

        // Send a 200 OK status with the updated item.
        return res.status(200).json({
            message: "Cart item quantity updated.",
            item: updatedItem
        });

    } catch (err) {
        console.error("Error updating cart item:", err);
        return res.status(500).json({ message: "Error updating cart item quantity." });
    }
}

async function removeItem(req, res) {
    try {
        // Get the cart item ID from the URL.
        const { id } = req.params;
        const userId = req.user._id;

        // --- VALIDATION: Check if ID format is valid ---
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Cart Item ID format." });
        }
        
        // Find and delete the cart item by its ID AND the user's ID (security check).
        const deletedItem = await CartModel.findOneAndDelete(
            { _id: id, userId: userId } // DUAL FIND criteria for security!
        );

        // Check if the item was found and deleted.
        if (!deletedItem) {
            // Item not found, or it doesn't belong to the logged-in user.
            return res.status(404).json({ message: "Cart item not found or does not belong to user." });
        }

        // Send a 200 OK status with a success message.
        return res.status(200).json({
            message: "Cart item successfully removed.",
            item: deletedItem
        });

    } catch (err) {
        console.error("Error removing cart item:", err);
        return res.status(500).json({ message: "Error removing cart item." });
    }
}

// Export the function (and placeholders for other CRUD operations).
module.exports = {
    addItem,
    fetchCart, 
    updateItem,
    removeItem,
};