import itemService from "../services/itemService.js";


class ItemsController {

  async getAll(req, res) {
    const limit = +req.query.limit;
    const page = +req.query.page;
    const id = req.user.id
    const itemList = await itemService.getAllItems(page, limit, id);
    res.json(itemList);
    return [];
  }

  async getallFree(req, res) {

    const limit = +req.query.limit;
    const page = +req.query.page;

    const itemList = await itemService.getallFree(page, limit);
    res.json(itemList);
    return [];
  }

  async createItem(req, res) {
    const item = req.body;
    const userID = req.user.id
    const newItem = await itemService.createItem(item, userID);
    res.json(newItem);
    return [];
  }

  async deleteItem(req, res) {
    const itemID = req.body.id;
    const delItem = await itemService.deleteItem(itemID);
    res.json(delItem);
    return [];
  }
  async update(req, res) {
    console.log("update 00000")
    console.log(req.body)
    console.log("update 11111")
    const userID = req.user.id
    const editedItem = req.body.editedItem;
    const ItemID = req.body.id;
    const updatedItem = await itemService.update(userID, editedItem, ItemID);
    res.json(updatedItem);
    return [];
  }


  async deleteImage(req, res) {
    const itemID = req.body.id;
    const delItem = await itemService.deleteImage(itemID);
    res.json(delItem);
    return [];
  }
  async newImage(req, res) {
    console.log("newImage-------")
    console.log(req.body);
    const item = req.body.img;
    const userID = req.user.id
    const newItem = await itemService.newImage(item, userID);
    res.json(newItem);
    return [];
  }

  async getImage(req, res) {
    console.log("getImage-------")
    console.log(req.query)
    const id = req.query.id
    const image = await itemService.getImage(id);
    console.log("getImage-------wwwwwwwwwwwww")
    console.log(image)
    res.json(image);
    return [];
  }

}
 
const itemsController = new ItemsController();
export default itemsController;

 
