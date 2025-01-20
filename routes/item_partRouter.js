import express from "express";

import {
  getItem_parts,
  getItem_part,
  createItem_part,
  updateItem_part,
  deleteItem_part,
  getItem_partQuerySql2,
} from "../controladores/control_item_part.js";

const router = express.Router();

//router.get("/item_parts", getItem_partQuerySql2);
router.get("/item_parts", getItem_parts);
router.get("/item_part/:variable", getItem_part);
router.post("/item_part", createItem_part);
router.put("/item_part", updateItem_part);
router.delete("/item_part", deleteItem_part);

export default router;
