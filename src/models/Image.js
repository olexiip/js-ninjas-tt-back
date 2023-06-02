import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
    id: {type: String, required: true},
    owner: {type: String, required: true, ref: "User"},
    img: {type: String, default: ""},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
//
);
 const Item = model("Item", ItemSchema);
 export default Item;