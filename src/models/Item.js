import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
    owner: {type: String, required: true, ref: "User"},
    mainImg: {type: String, ref: "Image", default: ""},
    images: [{type: String, ref: "Image", default: ""}],
    nickname:{type:String, required: true},
    realName: {type:String, required: false, default: "unknown"},
    originDescription: {type:String, required: false, default: "unknown"},
    superpowers: {type:String, required: false, default: "unknown"},
    catchPhrase: {type:String, required: false, default: "unknown"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
//
);
 const Item = model("Item", ItemSchema);
 export default Item;