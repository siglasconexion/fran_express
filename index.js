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

const {
  getBags,
  getBag,
  createBag,
  updateBag,
  deleteBag,
} = require("./controladores/control_bag.js");

const {
  getPakages,
  getPakage,
  createPakage,
  updatePakage,
  deletePakage,
} = require("./controladores/control_pakage.js");

const {
  getLabel_inputs,
  getLabel_input,
  getLabel_inputQuerySql2,
  createLabel_input,
  updateLabel_input,
  deleteLabel_input,
} = require("./controladores/control_label_input.js");

const {
  getStocks_label,
  getStock_label,
  createStock_label,
  updateStock_label,
  deleteStock_label,
  getStock_label_closed,
  getStock_labelQuerySql2,
} = require("./controladores/control_stock_label.js");

const {
  getStock_details_label,
  getStock_detail_label,
  createStock_detail_label,
  updateStock_detail_label,
  deleteStock_detail_label,
  getStock_detail_labelQuerySql2,
} = require("./controladores/control_stock_detail_label.js");

const {
  getCurrent_inventorys_label,
  getCurrent_inventory_label,
  createCurrent_inventory_label,
  updateCurrent_inventory_label,
  deleteCurrent_inventory_label,
  getCurrent_inventory_labelQuerySql2,
  getCurrent_inventory_labeldetailQuerySql2,
} = require("./controladores/control_current_inventory_label.js");

const {
  getStocks_pakage,
  getStock_pakage,
  createStock_pakage,
  updateStock_pakage,
  deleteStock_pakage,
  getStock_pakage_closed,
  getStock_pakageQuerySql2,
} = require("./controladores/control_stock_pakage.js");

const {
  getPakage_inputs,
  getPakage_input,
  getPakage_inputQuerySql2,
  createPakage_input,
  updatePakage_input,
  deletePakage_input,
} = require("./controladores/control_pakage_input.js");

const {
  getCurrent_inventorys_pakage,
  getCurrent_inventory_pakage,
  createCurrent_inventory_pakage,
  updateCurrent_inventory_pakage,
  deleteCurrent_inventory_pakage,
  getCurrent_inventory_pakageQuerySql2,
  getCurrent_inventory_pakagedetailQuerySql2,
} = require("./controladores/control_current_inventory_pakage.js");

const {
  getStock_details_pakage,
  getStock_detail_pakage,
  createStock_detail_pakage,
  updateStock_detail_pakage,
  deleteStock_detail_pakage,
  getStock_detail_pakageQuerySql2,
} = require("./controladores/control_stock_detail_pakage.js");

const {
  getStocks_bag,
  getStock_bag,
  createStock_bag,
  updateStock_bag,
  deleteStock_bag,
  getStock_bag_closed,
  getStock_bagQuerySql2,
} = require("./controladores/control_stock_bag.js");

const {
  getBag_inputs,
  getBag_input,
  getBag_inputQuerySql2,
  createBag_input,
  updateBag_input,
  deleteBag_input,
} = require("./controladores/control_bag_input.js");

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

// Model Bag
router.get("/bags", getBags);
router.get("/bag", getBag);
router.post("/bag", createBag);
router.put("/bag", updateBag);
router.delete("/bag", deleteBag);
// end model Bag

// Model Pakage
router.get("/pakages", getPakages);
router.get("/pakage", getPakage);
router.post("/pakage", createPakage);
router.put("/pakage", updatePakage);
router.delete("/pakage", deletePakage);
// end model Pakage

// Model label_input
router.get("/label_inputs", getLabel_inputs);
router.get("/label_input", getLabel_input);
router.get("/label_input_query", getLabel_inputQuerySql2);
router.post("/label_input", createLabel_input);
router.put("/label_input", updateLabel_input);
router.delete("/label_input", deleteLabel_input);
// end model label_input

// Model stock_label
//router.get("/stoks", getStock_labelQuerySql2);
router.get("/stocks_label_closed/:variable", getStock_label_closed);
router.get("/stocks_label", getStocks_label);
router.get("/stock_label", getStock_label);
router.post("/stock_label", createStock_label);
router.put("/stock_label", updateStock_label);
router.delete("/stock_label", deleteStock_label);
// end model stock_label

// Model Stock_detail_label
router.get("/stock_details_label", getStock_detail_labelQuerySql2);
//router.get("/stock_details_label", getStock_details_label);
router.get("/stock_detail_label/:variable", getStock_detail_label);
router.post("/stock_detail_label", createStock_detail_label);
router.put("/stock_detail_label", updateStock_detail_label);
router.delete("/stock_detail_label", deleteStock_detail_label);
// end model Stock_detail_label

// Model Current_inventory_label
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
router.post("/current_inventory_label", createCurrent_inventory_label);
router.put("/current_inventory_label", updateCurrent_inventory_label);
router.delete("/current_inventory_label", deleteCurrent_inventory_label);
// end model Current_inventory_label

// Model stock_pakage
//router.get("/stoks", getStock_pakageQuerySql2);
router.get("/stocks_pakage_closed/:variable", getStock_pakage_closed);
router.get("/stocks_pakage", getStocks_pakage);
router.get("/stock_pakage", getStock_pakage);
router.post("/stock_pakage", createStock_pakage);
router.put("/stock_pakage", updateStock_pakage);
router.delete("/stock_pakage", deleteStock_pakage);
// end model stock_pakage

// Model pakage_input
router.get("/pakage_inputs", getPakage_inputs);
router.get("/pakage_input", getPakage_input);
router.get("/pakage_input_query", getPakage_inputQuerySql2);
router.post("/pakage_input", createPakage_input);
router.put("/pakage_input", updatePakage_input);
router.delete("/pakage_input", deletePakage_input);
// end model pakage_input

// Model Current_inventory_pakage
router.get(
  "/current_inventorys_pakage/:variable",
  getCurrent_inventory_pakageQuerySql2
);
//router.post("/generate-pdf", generatePDF2); // prueb
router.get(
  "/current_inventorys_pakage_detail",
  getCurrent_inventory_pakagedetailQuerySql2
);
router.get("/current_inventory_pakage/:variable", getCurrent_inventory_pakage);
router.post("/current_inventory_pakage", createCurrent_inventory_pakage);
router.put("/current_inventory_pakage", updateCurrent_inventory_pakage);
router.delete("/current_inventory_pakage", deleteCurrent_inventory_pakage);
// end model Current_inventory_pakage

// Model Stock_detail_pakage
router.get("/stock_details_pakage", getStock_detail_pakageQuerySql2);
//router.get("/stock_details_pakage", getStock_details_pakage);
router.get("/stock_detail_pakage/:variable", getStock_detail_pakage);
router.post("/stock_detail_pakage", createStock_detail_pakage);
router.put("/stock_detail_pakage", updateStock_detail_pakage);
router.delete("/stock_detail_pakage", deleteStock_detail_pakage);
// end model Stock_detail_pakage

// Model stock_bag
//router.get("/stoks", getStock_bagQuerySql2);
router.get("/stocks_bag_closed/:variable", getStock_bag_closed);
router.get("/stocks_bag", getStocks_bag);
router.get("/stock_bag", getStock_bag);
router.post("/stock_bag", createStock_bag);
router.put("/stock_bag", updateStock_bag);
router.delete("/stock_bag", deleteStock_bag);
// end model stock_bag

// Model bag_input
router.get("/bag_inputs", getBag_inputs);
router.get("/bag_input", getBag_input);
router.get("/bag_input_query", getBag_inputQuerySql2);
router.post("/bag_input", createBag_input);
router.put("/bag_input", updateBag_input);
router.delete("/bag_input", deleteBag_input);
// end model bag_input

app.use("/api/", router);

app.listen(port, async () => {
  await db.sequelize;
  console.log(`Example app listening on port ${port}`);
});
