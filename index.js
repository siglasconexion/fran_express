const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authenticateUser } = require("./middleware/auth.js");

const {
  getFamilys,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  getUserQuerySql,
  getDataExcel,
} = require("./controladores/control_family.js");

const {
  getStatus,
  getStatu,
  createStatu,
  updateStatu,
  deleteStatu,
} = require("./controladores/control_statu.js");

const {
  getCompanys,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("./controladores/control_company.js");

const {
  getContainers,
  getContainer,
  createContainer,
  updateContainer,
  deleteContainer,
} = require("./controladores/control_container.js");

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("./controladores/control_item.js");

const {
  getStock_details,
  getStock_detail,
  createStock_detail,
  updateStock_detail,
  deleteStock_detail,
  getStock_detailQuerySql2,
} = require("./controladores/control_stock_detail.js");

const {
  getCurrent_inventorys,
  getCurrent_inventory,
  createCurrent_inventory,
  updateCurrent_inventory,
  deleteCurrent_inventory,
  getCurrent_inventoryQuerySql2,
  generatePDF,
} = require("./controladores/control_current_inventory.js");

const {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
  getStockQuerySql2,
} = require("./controladores/control_stock.js");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserQuerySql2,
  login,
} = require("./controladores/control_user.js");

const {
  getMeasure_ozs,
  createMeasure_oz,
  updateMeasure_oz,
  deleteMeasure_oz,
  getMeasure_ozQuerySql2,
} = require("./controladores/control_measure_oz.js");

const db = require("./db/conn.js");

const router = express.Router();
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Model family
router.get("/familys", getFamilys);
router.get("/family", getFamily);
router.post("/family", createFamily);
router.put("/family", updateFamily);
router.delete("/family", deleteFamily);
//router.get("/getDataExcel", getDataExcel);
//router.get("/getUserQuerySql", getUserQuerySql);
// end Model family

// Model status
router.get("/status", getStatus);
router.get("/statu", getStatu);
router.post("/statu", createStatu);
router.put("/statu", updateStatu);
router.delete("/statu", deleteStatu);
// end model status

// Model company
router.get("/companys", getCompanys);
router.get("/company", getCompany);
router.post("/company", createCompany);
router.put("/company", updateCompany);
router.delete("/company", deleteCompany);
// end model company

// Model container
router.get("/containers", getContainers);
router.get("/container", getContainer);
router.post("/container", createContainer);
router.put("/container", updateContainer);
router.delete("/container", deleteContainer);
// end model container

// Model Item
router.get("/items", getItems);
router.get("/item", getItem);
router.post("/item", createItem);
router.put("/item", updateItem);
router.delete("/item", deleteItem);
// end model item

// Model Stock_detail
router.get("/stock_details", getStock_detailQuerySql2);
//router.get("/stock_details", getStock_details);
router.get("/stock_detail", getStock_detail);
router.post("/stock_detail", createStock_detail);
router.put("/stock_detail", updateStock_detail);
router.delete("/stock_detail", deleteStock_detail);
// end model Stock_detail

// Model Current_inventory
router.get("/current_inventorys/:variable", getCurrent_inventoryQuerySql2);
router.post("/generate-pdf", generatePDF); // prueb
//router.get("/current_inventorys", getCurrent_inventorys);
router.get("/current_inventory/:variable", getCurrent_inventory);
router.post("/current_inventory", createCurrent_inventory);
router.put("/current_inventory", updateCurrent_inventory);
router.delete("/current_inventory", deleteCurrent_inventory);
// end model Current_inventory

// Model stock
//router.get("/stoks", getStockQuerySql2);
router.get("/stocks", getStocks);
router.get("/stock", getStock);
router.post("/stock", createStock);
router.put("/stock", updateStock);
router.delete("/stock", deleteStock);
// end model stock

// Model user
//router.get("/users", getUserQuerySql2);
router.get("/users", authenticateUser, getUsers);
router.get("/user", getUser);
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);
router.post("/login", login);
// end model user

// Model Measure_oz
router.get("/measure_ozs", getMeasure_ozQuerySql2);
//;
router.get("/measures", getMeasure_ozs);
router.post("/measure_oz", createMeasure_oz);
router.put("/measure_oz", updateMeasure_oz);
router.delete("/measure_oz", deleteMeasure_oz);
// end model Measure_oz

app.use("/api/", router);

app.listen(port, async () => {
  await db.sequelize;
  console.log(`Example app listening on port ${port}`);
});