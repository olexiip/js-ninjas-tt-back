
import Item from "../models/Item.js"

class ItemService {
    async createItem(req, res) {
        const newItem = new Item({
            owner:req.user.id, 
            nickname: req.body.nickname, 
            realName: req.body.realName, 
            originDescription: req.body.originDescription, 
            superpowers: req.body.superpowers, 
            catchPhrase: req.body.catchPhrase, 
            });
            newItem.save();
        return  newItem;
    }

    
    async getallFree(req, res) {
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
        return  result;
    }

    async getAllItems(req, res) {
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
        const userID = req.user.id;
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

    async deleteItem(req, res) {
        const itemID = req.body.id;
        const item = await Item.deleteOne({_id : itemID});
        return {res:"item deleted"};
    }

}

const itemService = new ItemService();
export default itemService;  