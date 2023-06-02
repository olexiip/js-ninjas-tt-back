
import User from "../models/User.js";
import Role from "../models/Roles.js";
import Token from "../models/Token.js";
import Item from "../models/Item.js"

class ItemService {
    async createItem(req, res) {
        console.log("ItemService >> createItem");
        const newItem = new Item({
            owner:req.user.id, 
            nickname: req.body.nickname, 
            realName: req.body.realName, 
            originDescription: req.body.originDescription, 
            superpowers: req.body.superpowers, 
            catchPhrase: req.body.catchPhrase, 
            });
            newItem.save();
        console.log(newItem);
        return  newItem;
    }

    
    async getallFree(req, res) {
        console.log("ItemService >> getallFree");
        const limit = +req.query.limit;
        const page = +req.query.page;
        const startIndex =(limit*(page)-limit);

        const collectionsize = await Item.estimatedDocumentCount();
        const allItems = await Item.find().skip(startIndex).limit(+limit);
        
        const result={
            itemList: allItems,
            total: +collectionsize, 
            page: +page, 
            limit: +limit
        } 
        //console.log(result);
        return  result;
    }

    async getAllItems(req, res) {
        console.log("ItemService >> getAllItems");
        const limit = +req.query.limit;
        const page = +req.query.page;
        const startIndex =(limit*(page)-limit);

        const collectionsize = await Item.find({owner : req.user.id}).estimatedDocumentCount();
        const allItems = await Item.find({owner : req.user.id}).skip(startIndex).limit(+limit);

        const result={
            itemList: allItems,
            total: +collectionsize, 
            page: +page, 
            limit: +limit
        } 
        return  result;
    }

    async update(req, res) {
        console.log("ItemService >> update");
        console.log(req.body);
        const userID = req.user.id;
        console.log(`userID ${userID}`)
        const ItemID = req.body.id;
        const editedItem = req.body.editedItem;
        const item = await Item.findById(ItemID);
        if (!(item.owner===userID)) {
            return {res: "error norm"};
        };
        item.mainImg = editedItem.mainImg,
        item.nickname = editedItem.nickname, 
        item.realName = editedItem.realName, 
        item.originDescription= editedItem.originDescription, 
        item.superpowers= editedItem.superpowers, 
        item.catchPhrase= editedItem.catchPhrase
    
        item.save();
        return {res: "text updated"};
    }

    async updateImage(req, res) {
        console.log(`service got updateStatus req `);
        const userID = req.user.id;
        const ItemID = req.body.id;
        const todo = req.body;
        const item = await Item.findById(ItemID);
        const isShred = item.sharedWith.indexOf(userID);
        if ((item.owner===userID) || (isShred>=0)) {
            item.isComplited=Item.isComplited;
            item.save();
            return {res: "status updated"};
        }
        return {res: "error norm"};
    }

    async deleteItem(req, res) {
        const userID = req.user.id;
        const ItemID = req.body.id;
        console.log(`service got item DELETE req `);
        const item = await Item.findById(ItemID);
        if (item?._id) {                       
            console.log(`item : ${item}`);
                if (item.owner === userID) {    
                    const delIsOK = await item.delete();
                    return {res:"item deleted"};
                } else {                      
                    const indexForDel = item.sharedWith.indexOf(userID)
                    if (indexForDel>=0) {
                        item.sharedWith.splice(indexForDel,1);
                        console.log(item.sharedWith);
                        await item.save();
                        return {res:"unsubscribed"}
                    }
                }
        }
        return {res:"errr"}
    }

}

const itemService = new ItemService();
export default itemService;  