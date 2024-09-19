import express from "express";

import {
  getCurrent_inventorys_item,
  getCurrent_inventory_item,
  createCurrent_inventory_item,
  updateCurrent_inventory_item,
  deleteCurrent_inventory_item,
  getCurrent_inventory_itemQuerySql2,
  generatePDF,
  generateNewPDF,
  getCurrent_inventory_itemdetailQuerySql2,
} from "../controladores/control_current_inventory_item.js";

const router = express.Router();

// Model Current_inventory_item
router.get(
  "/current_inventorys_item/:variable",
  getCurrent_inventory_itemQuerySql2
);
router.get(
  "/current_inventorys_item_detail/:variable",
  getCurrent_inventory_itemdetailQuerySql2
);
router.post("/generate-pdf", generatePDF); // prueb
router.get("/generate-new-pdf", generateNewPDF); // prueb
//router.get("/current_inventorys_item", getCurrent_inventorys_item);
router.get("/current_inventory_item/:variable", getCurrent_inventory_item);
router.post("/current_inventory_item", createCurrent_inventory_item);
router.put("/current_inventory_item", updateCurrent_inventory_item);
router.delete("/current_inventory_item", deleteCurrent_inventory_item);
// end model Current_inventory_item

export default router;
