import itemService from "../services/itemService.js";


class ItemsController {

  async getAll(req, res) {
    const limit = +req.query.limit;
    const page = +req.query.page;
    const id = req.user.id
    const itemList = await itemService.getAllItems(page, limit, id);
    res.json(itemList);
  }

  async getallFree(req, res) {

    const limit = +req.query.limit;
    const page = +req.query.page;

    const itemList = await itemService.getallFree(page, limit);
    res.json(itemList);
  }

  async createItem(req, res) {
    const item = req.body;
    const userID = req.user.id
    const newItem = await itemService.createItem(item, userID);
    res.json(newItem);
  }

  async deleteItem(req, res) {
    const itemID = req.body.id;
    const delItem = await itemService.deleteItem(itemID);
    res.json(delItem);
  }
  async update(req, res) {
    const userID = req.user.id
    const editedItem = req.body.editedItem;
    const ItemID = req.body.id;
    const updatedItem = await itemService.update(userID, editedItem, ItemID);
    res.json(updatedItem);
  }


  async deleteImage(req, res) {
    const itemID = req.body.id;
    const delItem = await itemService.deleteImage(itemID);
    res.json(delItem);
  }
  async newImage(req, res) {
    const item = req.body.img;
    const userID = req.user.id
    const newItem = await itemService.newImage(item, userID);
    res.json(newItem);
  }

  async getImage(req, res) {
    const id = req.query.id
    const image = await itemService.getImage(id);
    res.json(image);
  }

}
 
const itemsController = new ItemsController();
export default itemsController;

 
