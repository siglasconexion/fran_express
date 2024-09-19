import express from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controladores/control_item.js";

const router = express.Router();
router.get("/items", getItems);
router.get("/item", getItem);
router.post("/item", createItem);
router.put("/item", updateItem);
router.delete("/item", deleteItem);
export default router;
