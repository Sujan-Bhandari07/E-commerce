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
    // Explicitly disable id field to prevent conflicts
    id: false,
    // Ensure _id is properly handled
    _id: true
});

// Ensure no id field is created
productSchema.set('id', false);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
