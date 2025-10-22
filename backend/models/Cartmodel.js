import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

product:{
    type:Object,
    required: true,
    default:{}

},


userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
}
,
orderstatus:{
    type:String,
    enum:["order placed","packaging","shipped","out for delivery","delivered"],
    default:"order placed"
},

info:{
    type:Object,
    default:{}
}

},{timestamps:true,minimize:false})

 export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

