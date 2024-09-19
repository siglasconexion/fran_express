import express from "express";

import {
  getItem_informations,
  getItem_information,
  createItem_information,
  updateItem_information,
  deleteItem_information,
} from "../controladores/control_item_information.js";

const router = express.Router();

router.get("/item_informations", getItem_informations);
router.get("/item_information/:variable", getItem_information);
router.post("/item_information", createItem_information);
router.put("/item_information", updateItem_information);
router.delete("/item_information", deleteItem_information);

export default router;
