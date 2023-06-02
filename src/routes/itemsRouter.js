import express from "express";
import itemsController from "../Controllers/itemsController.js";
import authMiddlewares from "../middlewares/authMiddlewares.js";

const itemsRouter = express.Router();
itemsRouter.get("/getAll", authMiddlewares, async (req, res, next) => itemsController.getAll(req, res).catch(next));
itemsRouter.post("/addItem", authMiddlewares, async (req, res, next) => itemsController.createItem(req, res).catch(next));
itemsRouter.delete("/delItem", authMiddlewares, async (req, res, next) => itemsController.deleteItem(req, res).catch(next));
itemsRouter.post("/update", authMiddlewares, async (req, res, next) => itemsController.update(req, res).catch(next));
itemsRouter.post("/updateImage", authMiddlewares, async (req, res, next) => itemsController.updateImage(req, res).catch(next));


itemsRouter.get("/getallFree", async (req, res, next) => itemsController.getallFree(req, res).catch(next));

export default itemsRouter;