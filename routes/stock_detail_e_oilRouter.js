import express from "express";

import {
  getStock_details_e_oil,
  getStock_detail_e_oil,
  createStock_detail_e_oil,
  updateStock_detail_e_oil,
  deleteStock_detail_e_oil,
  getStock_detail_e_oilQuerySql2,
} from "../controladores/control_stock_detail_e_oil.js";

const router = express.Router();

// Model Stock_detail_e_oil
router.get("/stock_details_e_oil", getStock_detail_e_oilQuerySql2);
//router.get("/stock_details_e_oil", getStock_details_e_oil);
router.get("/stock_detail_e_oil/:variable", getStock_detail_e_oil);
router.post("/stock_detail_e_oil", createStock_detail_e_oil);
router.put("/stock_detail_e_oil", updateStock_detail_e_oil);
router.delete("/stock_detail_e_oil", deleteStock_detail_e_oil);
// end model Stock_detail_e_oil

export default router;
