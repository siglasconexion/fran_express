import express from "express";

import {
  getCurrent_inventorys_e_oil,
  getCurrent_inventory_e_oil,
  createCurrent_inventory_e_oil,
  updateCurrent_inventory_e_oil,
  deleteCurrent_inventory_e_oil,
  getCurrent_inventory_e_oilQuerySql2,
  getCurrent_inventory_e_oildetailQuerySql2,
  //generatePDF2,
} from "../controladores/control_current_inventory_e_oil.js";

const router = express.Router();

router.get(
  "/current_inventorys_e_oil/:variable",
  getCurrent_inventory_e_oilQuerySql2
);
// router.post("/generate-pdf", generatePDF2); // prueb
router.get(
  "/current_inventorys_e_oil_detail",
  getCurrent_inventory_e_oildetailQuerySql2
);
router.get("/current_inventory_e_oil/:variable", getCurrent_inventory_e_oil);
router.post("/current_inventory_e_oil", createCurrent_inventory_e_oil);
router.put("/current_inventory_e_oil", updateCurrent_inventory_e_oil);
router.delete("/current_inventory_e_oil", deleteCurrent_inventory_e_oil);

export default router;
