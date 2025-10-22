import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: [{
        type: String,
        required: false,
    }],
    subcategory: { type: String, required: true },
    size: [{ type: String, required: true }],
    isbestseller: { type: Boolean, default: false }
}, { 
    timestamps: true,
    collection: 'products' // Explicitly set collection name to lowercase 'products'
});

const Product = mongoose.model("Product", productSchema);

export default Product;
