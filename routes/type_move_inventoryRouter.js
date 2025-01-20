import express from "express";

import {
  getType_move_inventorys,
  getType_move_inventory,
  createType_move_inventory,
  updateType_move_inventory,
  deleteType_move_inventory,
  getType_move_inventoryQuerySql2,
} from "../controladores/control_type_move_inventory.js";

const router = express.Router();

//router.get("/type_inventorys", getType_inventoryQuerySql2);
router.get("/type_move_inventorys", getType_move_inventorys);
router.get("/type_move_inventory", getType_move_inventory);
router.post("/type_move_inventory", createType_move_inventory);
router.put("/type_move_inventory", updateType_move_inventory);
router.delete("/type_move_inventory", deleteType_move_inventory);

export default router;
