import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
    owner: {type: String, required: true, ref: "User"},
    mainImg: {type: String, ref: "Image", default: ""},
    images: [{type: String, ref: "Image", default: ""}],
    originDescription: {type:String, required:true},
    superpowers: {type:String, required:true},
    catchPhrase: {type:String, required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
//
);
 const Item = model("Item", ItemSchema);
 export default Item;