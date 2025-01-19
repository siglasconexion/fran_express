import express from "express";

import {
  getOther_move_items,
  getOther_move_item,
  createOther_move_item,
  updateOther_move_item,
  deleteOther_move_item,
  getOther_move_items_stock,
} from "../controladores/control_other_move_item.js";

const router = express.Router();

router.get("/other_move_items", getOther_move_items);
router.get("/other_move_item", getOther_move_item);
router.post("/other_move_item", createOther_move_item);
router.put("/other_move_item", updateOther_move_item);
router.delete("/other_move_item", deleteOther_move_item);
router.get(
  "/other_move_item/:iditem/:idstock/:idtypemove",
  getOther_move_items_stock
);
export default router;
