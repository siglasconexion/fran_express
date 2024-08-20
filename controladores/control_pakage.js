const { Pakage } = require("../db/models/pakage.js");
const {
  Current_inventory_pakage,
} = require("../db/models/current_inventory_pakage.js");
const { QueryTypes } = require("sequelize");
const db = require("../db/conn.js");
const _ = require("lodash");

const getPakages = async (req, res) => {
  const data = await Pakage.findAll();
  /*   data = await db.sequelize.query(`SELECT  * from pakage ORDER BY id_pakage`, {
    type: QueryTypes.SELECT,
  }); */
  /////////////////////////////////////
  //let datos = json(data);
  /* console.log(data);
  for (const el of data) {
    let idpakage = el.id_pakage;
    console.log("idpakage", idpakage);
    console.log("el.id_pakge", el.id_pakage);
    let idstock = 1;
    let total = 0;
    let ini = 0;
    let pro = 0;
    let oth = 0;
    let sal = 0;
    let sen = 0;
    let dam = 0;
    let def = 0;
    let ret = 0;
    let adj = 0;

    const resultNew2 = await Current_inventory_pakage.findOne({
      where: {
        id_pakage_current_inventory_pakage: idpakage,
        id_stock_current_inventory_pakage: idstock,
      },
    });
    let convertResultNew2 = resultNew2?.toJSON();
    console.log("primera consulta", convertResultNew2);
    if (_.isEmpty(convertResultNew2)) {
      const resultNew3 = await Current_inventory_pakage.create({
        id_stock_current_inventory_pakage: idstock,
        id_pakage_current_inventory_pakage: idpakage,
        total_current_inventory_pakage: total,
        initial: ini,
        production: pro,
        other_entries: oth,
        damaged: dam,
        defeated: def,
        returned: ret,
        adjustment: adj,
      });
      console.log("segunda", resultNew3);

      //Object.entries(resultNew3).length === 0
      //  ? res.json({ message: "Register is not created" })
      //  : res.json({ message: resultNew3 });
      //return;
    }
  } */
  //////////////////////////////////////////////
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }

  res.status(200).json(data);
};

const getPakage = async (req, res) => {
  let resultGetOne = await Pakage.findAll({
    where: {
      id_pakage: req.body.id,
    },
  });
  if (resultGetOne.length <= 0) {
    res.json({
      message: "Results not found",
    });
    return;
  }
  res.json(resultGetOne);
};

const createPakage = async (req, res) => {
  const resultNew = await Pakage.create({
    id_company_pakage: req.body.idcompanypakage,
    id_status_pakage: req.body.idstatuspakage,
    id_measure_pakage: req.body.idmeasurepakage,
    id_family_pakage: req.body.idfamilypakage,
    code_pakage: req.body.codepakage,
    name_pakage: req.body.namepakage,
    stock_pakage: req.body.stockpakage,
    low_stock_pakage: req.body.lowstockpakage,
    qty_pakage: req.body.qtypakage,
    weight_pakage: req.body.weightpakage,
    weight_box_pakage: req.body.weightboxpakage,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updatePakage = async (req, res) => {
  try {
    const obj = req.body;
    const id_pakage = req.body.id_pakage;
    let resultUpdate = await Pakage.update(obj, {
      where: {
        id_pakage: id_pakage,
      },
    });
    if (resultUpdate[0] === 1) {
      res.status(200).json({
        message: "Status Update successfully",
        resultUpdate: resultUpdate,
      });
    } else {
      throw { status: res.status, statusText: res.statusText };
      res.status(400).json({
        error: "valor demasiado grande",
        message: "Status not successfully",
        resultUpdate: resultUpdate,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "valor demasiado grande",
      message: "Status not successfully",
    });
    console.log(err.stack);
    console.log("aca solo el error", err);
  }
};

const deletePakage = async (req, res) => {
  try {
    const id_pakage = req.body.id;
    let resultDelete = await Pakage.destroy({
      where: {
        id_pakage,
      },
    });
    resultDelete === 1
      ? res.json({
          message: "Status was deleted successfully",
          resultDelete: resultDelete,
        })
      : res.json({
          message: "Status Not deleted successfully",
          resultdelete: resultDelete,
        });
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getPakages,
  getPakage,
  createPakage,
  updatePakage,
  deletePakage,
};
