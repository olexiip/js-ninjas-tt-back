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
    console.log(item);
    console.log("itemsController > createItem");
    const newItem = await itemService.createItem(item);
    res.json(newItem);
    return [];
  }

  async deleteItem(req, res) {
    console.log("itemsController > deleteItem");
    const itemID = req.body.id;
    const delItem = await itemService.deleteItem(itemID);
    res.json(delItem);
    return [];
  }
  async update(req, res) {
    console.log("itemsController > update");
    const userID = req.user.id
    const editedItem = req.body.editedItem;
    const updatedItem = await itemService.update(userID, editedItem);
    res.json(updatedItem);
    return [];
  }

}
 
const itemsController = new ItemsController();
export default itemsController;

 
