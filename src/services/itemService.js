
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
        console.log("ItemService >> getAllItems");
        const limit = +req.query.limit;
        const page = +req.query.page;
        const allItems = await Item.find();
        const a =(limit*(page+1)-20);
        const startIndex = ((a>=0)?a:0);
        const finalIndex = startIndex + +limit;
        //console.log(`>>>> indexes   ${a}, ${finalIndex}`)
        const itemList = allItems.slice(startIndex, finalIndex);
        //console.log(itemList)
        const total = itemList.length;
        const result={
            itemList,
            total: +total, 
            page: +page, 
            limit: +limit
        } 
        //console.log(result);
        return  result;
    }

    async getAllItems(req, res) {
        console.log("ItemService >> getAllItems");
        // console.log(req.user.id)
        // console.log(req.body)
        // console.log(req.query)
        const limit = +req.query.limit;
        const page = +req.query.page;
        const allItems = await Item.find({owner : req.user.id});
        const a =(limit*(page+1)-20);
        const startIndex = ((a>=0)?a:0);
        const finalIndex = startIndex + +limit;
        //console.log(`>>>> indexes   ${a}, ${finalIndex}`)
        const itemList = allItems.slice(startIndex, finalIndex);
        //console.log(itemList)
        const total = itemList.length;
        const result={
            itemList,
            total: +total, 
            page: +page, 
            limit: +limit
        } 
        //console.log(result);
        return  result;
    }

  //  async getById(id) {
   //     console.log(`service got req with id=${id}`);
   //     return todoRepository.getById(id);
    //}

    async update(req, res) {
        console.log("ItemService >> update");
        console.log(req.body);
        const userID = req.user.id;
        console.log(`userID ${userID}`)
        const ItemID = req.body.id;
        const editedItem = req.body.editedItem;
        // console.log(`ItemID ${ItemID}`)
        // console.log(`todo ${todo}`)
        // console.log(todo)
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
        if (item?._id) {                        // item exist
            console.log(`item : ${item}`);
                if (item.owner === userID) {    // user is ownwer -> delete
                    const delIsOK = await item.delete();
                    return {res:"item deleted"};
                } else {                       // user is subscriber -> unsub
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