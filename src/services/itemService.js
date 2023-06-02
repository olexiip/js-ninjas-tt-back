
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
        console.log("ItemService >> deleteItem");
        const item = await Item.deleteOne({_id : ItemID});
        return {res:"item deleted"};
    }

}

const itemService = new ItemService();
export default itemService;  