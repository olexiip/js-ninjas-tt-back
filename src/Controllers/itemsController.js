import itemService from "../services/itemService.js";


class ItemsController {

  async getAll(req, res) {
    console.log("itemsController > getAll");
    const itemList = await itemService.getAllItems(req, res);
    res.json(itemList);
    return [];
  }

  async getallFree(req, res) {
    console.log("itemsController > getAll");
    const itemList = await itemService.getallFree(req, res);
    res.json(itemList);
    return [];
  }

  async createItem(req, res) {
    console.log("itemsController > createItem");
    const newItem = await itemService.createItem(req, res);
    res.json(newItem);
    return [];
  }

  async deleteItem(req, res) {
    console.log("itemsController > deleteItem");
    const delItem = await itemService.deleteItem(req, res);
    res.json(delItem);
    return [];
  }
  async update(req, res) {
    console.log("itemsController > update");
    const updatedItem = await itemService.update(req, res);
    res.json(updatedItem);
    return [];
  }

  async updateImage(req, res) {
    console.log("itemsController > updateImage");
    const ipdupdatedItematedItem = await itemService.updateImage(req, res);
    res.json(updatedItem);
    return [];
  }

}
 
const itemsController = new ItemsController();
export default itemsController;

 
