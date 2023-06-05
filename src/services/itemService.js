
import Item from "../models/Item.js"

class ItemService {
    async createItem(item, userID) {
        const newItem = new Item({
            owner            : userID, 
            nickname         : item.nickname, 
            realName         : item.realName, 
            originDescription: item.originDescription, 
            superpowers      : item.superpowers, 
            catchPhrase      : item.catchPhrase, 
            });
            newItem.save();
        return  newItem;
    }

    
    async getallFree(page, limit) {

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

    async getAllItems(page, limit, id) {

        const startIndex =(limit*(page)-limit);

        const collectionsize = await Item.countDocuments({owner : id});
        const allItems = await Item.find({owner : id}).skip(startIndex).limit(+limit);

        const result={
            itemList: allItems,
            total: +collectionsize, 
            page: +page, 
            limit: +limit
        } 
        return  result;
    }

    async update(userID, editedItem, ItemID) {
        console.log(userID)
        console.log(editedItem)
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

    async deleteItem(id) {
        const itemID = req.body.id;
        const item = await Item.deleteOne({_id : id});
        return {res:"item deleted"};
    }

}

const itemService = new ItemService();
export default itemService;  