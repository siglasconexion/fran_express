import express from "express";

import {
  getMove_inventorys,
  getMove_inventory,
  createMove_inventory,
  updateMove_inventory,
  deleteMove_inventory,
  getMove_inventorys_Stock,
} from "../controladores/control_move_inventory.js";

const router = express.Router();

router.get("/move_inventorys", getMove_inventorys);
router.get("/move_inventory", getMove_inventory);
router.post("/move_inventory", createMove_inventory);
router.put("/move_inventory", updateMove_inventory);
router.delete("/move_inventory", deleteMove_inventory);
router.get("/move_inventory/:iditempart/:idstock/:idtypeinventory/:idsection", getMove_inventorys_Stock);
export default router;
