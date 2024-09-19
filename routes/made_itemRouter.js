import express from "express";

import {
  getMade_items,
  getMade_item,
  createMade_item,
  updateMade_item,
  deleteMade_item,
  //  getItem_type_rechargeQuerySql2,
} from "../controladores/control_made_item.js";

const router = express.Router();

router.get("/made_items", getMade_items);
//router.get("/item_information/:variable", getItem_information);
router.get("/made_item", getMade_item);
router.post("/made_item", createMade_item);
router.put("/made_item", updateMade_item);
router.delete("/made_item", deleteMade_item);

export default router;
