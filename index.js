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
  getStock_details_item,
  getStock_detail_item,
  createStock_detail_item,
  updateStock_detail_item,
  deleteStock_detail_item,
  getStock_detail_itemQuerySql2,
} = require("./controladores/control_stock_detail_item.js");

const {
  getCurrent_inventorys_item,
  getCurrent_inventory_item,
  createCurrent_inventory_item,
  updateCurrent_inventory_item,
  deleteCurrent_inventory_item,
  getCurrent_inventory_itemQuerySql2,
  generatePDF,
  generateNewPDF,
} = require("./controladores/control_current_inventory_item.js");

const {
  getStocks_item,
  getStock_item,
  createStock_item,
  updateStock_item,
  deleteStock_item,
  getStock_itemQuerySql2,
} = require("./controladores/control_stock_item.js");

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
  getType_users,
  getType_user,
  createType_user,
  updateType_user,
  deleteType_user,
  getType_usersQuerySql2,
} = require("./controladores/control_type_user.js");

const {
  getMeasures,
  createMeasure,
  updateMeasure,
  deleteMeasure,
  getMeasureQuerySql2,
} = require("./controladores/control_measure.js");

const {
  getEssential_oils,
  getEssential_oil,
  createEssential_oil,
  updateEssential_oil,
  deleteEssential_oil,
} = require("./controladores/control_essential_oil.js");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("./controladores/control_department.js");

const {
  getOil_inputs,
  getOil_input,
  getOil_inputQuerySql2,
  createOil_input,
  updateOil_input,
  deleteOil_input,
} = require("./controladores/control_oil_input.js");

const {
  getStocks_e_oil,
  getStock_e_oil,
  createStock_e_oil,
  updateStock_e_oil,
  deleteStock_e_oil,
  getStock_e_oil_closed,
  getStock_e_oilQuerySql2,
} = require("./controladores/control_stock_e_oil.js");

const {
  getCurrent_inventorys_e_oil,
  getCurrent_inventory_e_oil,
  createCurrent_inventory_e_oil,
  updateCurrent_inventory_e_oil,
  deleteCurrent_inventory_e_oil,
  getCurrent_inventory_e_oilQuerySql2,
  getCurrent_inventory_e_oildetailQuerySql2,
  generatePDF2,
} = require("./controladores/control_current_inventory_e_oil.js");

const {
  getStock_details_e_oil,
  getStock_detail_e_oil,
  createStock_detail_e_oil,
  updateStock_detail_e_oil,
  deleteStock_detail_e_oil,
  getStock_detail_e_oilQuerySql2,
} = require("./controladores/control_stock_detail_e_oil.js");

const {
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel,
} = require("./controladores/control_label.js");

const db = require("./db/conn.js");

const router = express.Router();
const app = express();
const port = 3002;

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

// Model Stock_detail_item
router.get("/stock_details_item", getStock_detail_itemQuerySql2);
//router.get("/stock_details_item", getStock_details_item);
router.get("/stock_detail_item", getStock_detail_item);
router.post("/stock_detail_item", createStock_detail_item);
router.put("/stock_detail_item", updateStock_detail_item);
router.delete("/stock_detail_item", deleteStock_detail_item);
// end model Stock_detail_item

// Model Current_inventory_item
router.get(
  "/current_inventorys_item/:variable",
  getCurrent_inventory_itemQuerySql2
);
router.post("/generate-pdf", generatePDF); // prueb
router.get("/generate-new-pdf", generateNewPDF); // prueb
//router.get("/current_inventorys_item", getCurrent_inventorys_item);
router.get("/current_inventory_item/:variable", getCurrent_inventory_item);
router.post("/current_inventory_item", createCurrent_inventory_item);
router.put("/current_inventory_item", updateCurrent_inventory_item);
router.delete("/current_inventory_item", deleteCurrent_inventory_item);
// end model Current_inventory_item

// Model stock_item
//router.get("/stoks", getStock_itemQuerySql2);
router.get("/stocks_item", getStocks_item);
router.get("/stock_item", getStock_item);
router.post("/stock_item", createStock_item);
router.put("/stock_item", updateStock_item);
router.delete("/stock_item", deleteStock_item);
// end model stock_item

// Model user
//router.get("/users", getUserQuerySql2);
//router.get("/users", authenticateUser, getUsers);
router.get("/users", getUsers);
router.get("/user", getUser);
router.post("/user", createUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);
router.post("/login", login);
// end model user

// Model type_user
//router.get("/type_users", gettype_userQuerySql2);
router.get("/type_users", getType_users);
router.get("/type_user", getType_user);
router.post("/type_user", createType_user);
router.put("/type_user", updateType_user);
router.delete("/type_user", deleteType_user);
// end model type_user

// Model Measure
///router.get("/measure_ozs", getMeasure_ozQuerySql2);
//;
router.get("/measures", getMeasures);
router.post("/measure", createMeasure);
router.put("/measure", updateMeasure);
router.delete("/measure", deleteMeasure);
// end model Measure

// Model Essential_oil
router.get("/essential_oils", getEssential_oils);
router.get("/essential_oil", getEssential_oil);
router.post("/essential_oil", createEssential_oil);
router.put("/essential_oil", updateEssential_oil);
router.delete("/essential_oil", deleteEssential_oil);
// end model Essential_oil

// Model E_oil_family

// end model E_oil_family

// Model E_oil_container

// end model E_oil_container

// Model E_oil_measure

// end model E_oil_measure

// Model department
router.get("/departments", getDepartments);
router.get("/department", getDepartment);
router.post("/department", createDepartment);
router.put("/department", updateDepartment);
router.delete("/department", deleteDepartment);
// end model department

// Model oil_input
router.get("/oil_inputs", getOil_inputs);
router.get("/oil_input", getOil_input);
router.get("/oil_input_query", getOil_inputQuerySql2);
router.post("/oil_input", createOil_input);
router.put("/oil_input", updateOil_input);
router.delete("/oil_input", deleteOil_input);
// end model oil_input

// Model stock_e_oil
//router.get("/stoks", getStock_e_oilQuerySql2);
router.get("/stocks_e_oil_closed/:variable", getStock_e_oil_closed);
router.get("/stocks_e_oil", getStocks_e_oil);
router.get("/stock_e_oil", getStock_e_oil);
router.post("/stock_e_oil", createStock_e_oil);
router.put("/stock_e_oil", updateStock_e_oil);
router.delete("/stock_e_oil", deleteStock_e_oil);
// end model stock_e_oil

// Model Current_inventory_e_oil
router.get(
  "/current_inventorys_e_oil/:variable",
  getCurrent_inventory_e_oilQuerySql2
);
router.post("/generate-pdf", generatePDF2); // prueb
router.get(
  "/current_inventorys_e_oil_detail",
  getCurrent_inventory_e_oildetailQuerySql2
);
router.get("/current_inventory_e_oil/:variable", getCurrent_inventory_e_oil);
router.post("/current_inventory_e_oil", createCurrent_inventory_e_oil);
router.put("/current_inventory_e_oil", updateCurrent_inventory_e_oil);
router.delete("/current_inventory_e_oil", deleteCurrent_inventory_e_oil);
// end model Current_inventory_e_oil

// Model Stock_detail_e_oil
router.get("/stock_details_e_oil", getStock_detail_e_oilQuerySql2);
//router.get("/stock_details_e_oil", getStock_details_e_oil);
router.get("/stock_detail_e_oil/:variable", getStock_detail_e_oil);
router.post("/stock_detail_e_oil", createStock_detail_e_oil);
router.put("/stock_detail_e_oil", updateStock_detail_e_oil);
router.delete("/stock_detail_e_oil", deleteStock_detail_e_oil);
// end model Stock_detail_e_oil

// Model Label
router.get("/labels", getLabels);
router.get("/label", getLabel);
router.post("/label", createLabel);
router.put("/label", updateLabel);
router.delete("/label", deleteLabel);
// end model label

app.use("/api/", router);

app.listen(port, async () => {
  await db.sequelize;
  console.log(`Example app listening on port ${port}`);
});
