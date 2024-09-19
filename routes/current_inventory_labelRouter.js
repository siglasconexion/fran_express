import express from "express";

import {
  getCurrent_inventorys_label,
  getCurrent_inventory_label,
  createCurrent_inventory_label,
  updateCurrent_inventory_label,
  deleteCurrent_inventory_label,
  getCurrent_inventory_labelQuerySql2,
  getCurrent_inventory_labeldetailQuerySql2,
  getCurrent_inventory_label_plus,
} from "../controladores/control_current_inventory_label.js";

const router = express.Router();

router.get(
  "/current_inventorys_label/:variable",
  getCurrent_inventory_labelQuerySql2
);
//router.post("/generate-pdf", generatePDF2); // prueb
router.get(
  "/current_inventorys_label_detail",
  getCurrent_inventory_labeldetailQuerySql2
);
router.get("/current_inventory_label/:variable", getCurrent_inventory_label);
router.get(
  "/current_inventory_label_plus/:variable",
  getCurrent_inventory_label_plus
);
router.post("/current_inventory_label", createCurrent_inventory_label);
router.put("/current_inventory_label", updateCurrent_inventory_label);
router.delete("/current_inventory_label", deleteCurrent_inventory_label);

export default router;
