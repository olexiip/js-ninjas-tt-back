
import Item from "../models/Item.js"
import Image from "../models/Image.js";

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
        item.mainImg = editedItem.mainImg;
        item.nickname = editedItem.nickname;
        item.realName = editedItem.realName; 
        item.originDescription= editedItem.originDescription;
        item.superpowers= editedItem.superpowers;
        item.catchPhrase= editedItem.catchPhrase;
        item.images = editedItem.images;
        await item.save();
        return {res: item};
    }

    async deleteItem(id) {
        const item = await Item.deleteOne({_id : id});
        return {res:"item deleted"};
    }

    async newImage(item, userID) {
      console.log("item-----------")
      console.log(item)
        const newItem = new Image({
            owner: userID, 
            img: item,
            });
            newItem.save();
        return  newItem;
    }

    async getImage(id) {
      console.log(id)
        const image = await Image.findById(id);
        return  image;
    }

    async deleteImage(id) {
        const itemID = req.body.id;
        const item = await Image.deleteOne({_id : id});
        return {res:"item deleted"};
    }

}

const itemService = new ItemService();
export default itemService;  