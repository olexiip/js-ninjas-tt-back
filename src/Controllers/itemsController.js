
class ItemsController {

  async getAll(req, res) {
    console.log("itemsController > getAll");

    res.json("get all");
    return [];
  }

  async createItem(req, res) {
    console.log("itemsController > createItem");

    res.json("createItem");
  }
  async deleteItem(req, res) {
    console.log("itemsController > deleteItem");

    res.json("deleteItem");
  }
  async update(req, res) {
    console.log("itemsController > update");

    res.json("update");
  }
}
 
const itemsController = new ItemsController();
export default itemsController;

 
