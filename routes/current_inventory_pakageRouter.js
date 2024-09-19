import express from "express";

import {
  getCurrent_inventorys_pakage,
  getCurrent_inventory_pakage,
  createCurrent_inventory_pakage,
  updateCurrent_inventory_pakage,
  deleteCurrent_inventory_pakage,
  getCurrent_inventory_pakageQuerySql2,
  getCurrent_inventory_pakagedetailQuerySql2,
  getCurrent_inventory_pakage_plus,
} from "../controladores/control_current_inventory_pakage.js";

const router = express.Router();

router.get(
  "/current_inventorys_pakage/:variable",
  getCurrent_inventory_pakageQuerySql2
);
//router.post("/generate-pdf", generatePDF2); // prueb
router.get(
  "/current_inventory_pakage_plus/:variable",
  getCurrent_inventory_pakage_plus
);

router.get(
  "/current_inventorys_pakage_detail",
  getCurrent_inventory_pakagedetailQuerySql2
);
router.get("/current_inventory_pakage/:variable", getCurrent_inventory_pakage);
router.post("/current_inventory_pakage", createCurrent_inventory_pakage);
router.put("/current_inventory_pakage", updateCurrent_inventory_pakage);
router.delete("/current_inventory_pakage", deleteCurrent_inventory_pakage);

export default router;
