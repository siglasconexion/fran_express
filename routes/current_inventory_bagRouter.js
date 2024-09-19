import express from "express";

import {
  getCurrent_inventorys_bag,
  getCurrent_inventory_bag_plus,
  getCurrent_inventory_bag,
  createCurrent_inventory_bag,
  updateCurrent_inventory_bag,
  deleteCurrent_inventory_bag,
  getCurrent_inventory_bagQuerySql2,
  getCurrent_inventory_bagdetailQuerySql2,
} from "../controladores/control_current_inventory_bag.js";
const router = express.Router();

router.get(
  "/current_inventorys_bag/:variable",
  getCurrent_inventory_bagQuerySql2
);
router.get(
  "/current_inventory_bag_plus/:variable",
  getCurrent_inventory_bag_plus
);
router.get(
  "/current_inventorys_bag_detail",
  getCurrent_inventory_bagdetailQuerySql2
);
router.get("/current_inventory_bag/:variable", getCurrent_inventory_bag);
router.post("/current_inventory_bag", createCurrent_inventory_bag);
router.put("/current_inventory_bag", updateCurrent_inventory_bag);
router.delete("/current_inventory_bag", deleteCurrent_inventory_bag);


export default router;
