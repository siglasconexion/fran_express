import express from "express";

import {
  getMade_items,
  getMade_item,
  createMade_item,
  updateMade_item,
  deleteMade_item,
  getMade_items_Stock,
  //  getItem_type_rechargeQuerySql2,
} from "../controladores/control_made_item.js";

const router = express.Router();

router.get("/made_items", getMade_items);
//router.get("/item_information/:variable", getItem_information);
router.get("/made_item", getMade_item);
router.post("/made_item", createMade_item);
router.put("/made_item", updateMade_item);
router.delete("/made_item", deleteMade_item);
router.get("/made_item/:iditem/:idstock", getMade_items_Stock);
export default router;
