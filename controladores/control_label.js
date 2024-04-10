const { Label } = require("../db/models/label.js");

const getLabels = async (req, res) => {
  const data = await Label.findAll();
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

const getLabel = async (req, res) => {
  let resultGetOne = await Label.findAll({
    where: {
      id_label: req.body.id,
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

const createLabel = async (req, res) => {
  const resultNew = await Label.create({
    id_company_label: req.body.idcompanylabel,
    id_status_label: req.body.idstatuslabel,
    id_measure_label: req.body.idmeasurelabel,
    id_family_label: req.body.idfamilylabel,
    code_label: req.body.codelabel,
    code_two_label: req.body.codetwolabel,
    name_label: req.body.namelabel,
    name_complement_label: req.body.namecomplementlabel,
    stock_label: req.body.stocklabel,
    sku_short_label: req.body.skushortlabel,
    sku_large_label: req.body.skulargelabel,
    low_stock_label: req.body.lowstocklabel,
    qty_label: req.body.qtylabel,
    total_weight_label: req.body.totalweightlabel,
    waste_weight_label: req.body.wasteweightlabel,
    weight_label: req.body.weightlabel,
    weight_support_label: req.body.weightsupportlabel,
  });
  /*   let id_item = req.body.iditem;
  let skularge = req.body.skulargelabel;
  const obj2 = {
    id_item: req.body.iditem,
    sku_large_item: req.body.skulargelabel,
  };
  const resultUpdate2 = await Item.update(obj2, {
    where: {
      id_item: id_item,
    },
  });
 */
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

const updateLabel = async (req, res) => {
  try {
    const obj = req.body;
    const id_label = req.body.id_label;
    let resultUpdate = await Label.update(obj, {
      where: {
        id_label: id_label,
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

const deleteLabel = async (req, res) => {
  try {
    const id_label = req.body.id;
    let resultDelete = await Label.destroy({
      where: {
        id_label,
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
  getLabels,
  getLabel,
  createLabel,
  updateLabel,
  deleteLabel,
};
