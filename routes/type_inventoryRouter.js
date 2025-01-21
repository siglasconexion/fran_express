import express from "express";

import {
  getType_inventorys,
  getType_inventory,
  createType_inventory,
  updateType_inventory,
  deleteType_inventory,
  getType_inventoryQuerySql2,
} from "../controladores/control_type_inventory.js";

const router = express.Router();

//router.get("/type_inventorys", getType_inventoryQuerySql2);
router.get("/type_inventorys", getType_inventorys);
router.get("/type_inventory", getType_inventory);
router.post("/type_inventory", createType_inventory);
router.put("/type_inventory", updateType_inventory);
router.delete("/type_inventory", deleteType_inventory);

export default router;
