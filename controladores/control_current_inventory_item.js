import { Current_inventory_item } from "../db/models/current_inventory_item.js";
import { db } from "../db/conn.js";
import { QueryTypes } from "sequelize";
import xlsxj from "xlsx-to-json";
import fs from "fs";
import { request } from "http";
import _ from "lodash";
// import puppeteer from 'puppeteer';
// const jsPDF = require("jspdf");

export const getCurrent_inventorys_item = async (req, res) => {
  const data = await Current_inventory_item.findAll();
  if (data.length <= 0) {
    res.status(201).json({
      code: 201,
      message: "Results not foundssdsdasdasd",
      statusText: "nuevo mensaje",
      ok: "false",
    });
    return;
  }
  const jsonData = data.map((result) => result.toJSON());
  console.log("akika backend ", jsonData);
  res.status(200).json(data);
};

export const getCurrent_inventory_itemQuerySql2 = async (req, res) => {
  // rutas - routes
  let variablefinal = req.params.variable;
  let variable33 = req.params.variable;
  let variable2 = req.params;
  let variable3 = Object.values(variable2);
  let variable4 = variable3[0];
  console.log(
    "HEY CA LA VARIABLE",
    variable33,
    req.params,
    variable2,
    variable3,
    variable4,
    variablefinal
  );
  console.log("variable sola del objeto params", variablefinal);
  const data = await db.sequelize.query(
    `SELECT  total_current_inventory_item, id_stock_current_inventory_item, id_item_current_inventory_item,  name_item, id_family_item, name_family, code_item, code_two_item from current_inventory_item INNER JOIN item on current_inventory_item.id_item_current_inventory_item=item.id_item INNER JOIN family on item.id_family_item=family.id_family where current_inventory_item.id_stock_current_inventory_item = ${variable4} ORDER BY name_family, name_item`,
    { type: QueryTypes.SELECT }
  ); //
  // rutina para chequear si lo introducido en el detalle cuadra con resumen
  /*   let arrayIntroducido = [];
  let totalIntroducido = 0;
  let diferenciaIntroducido = 0;
  let contador = 0;
  for (const el of data) {
    totalIntroducido = 0;
    diferenciaIntroducido = 0;
    contador = 0;
    const data2 = await db.sequelize.query(
      `SELECT total_stock_detail_item from stock_detail_item WHERE id_item_stock_detail_item = ${el.id_item_current_inventory_item} AND id_stock_stock_detail_item = ${el.id_stock_current_inventory_item}`,
      { type: QueryTypes.SELECT }
    );
    for (const el2 of data2) {
      totalIntroducido = totalIntroducido + el2.total_stock_detail_item;
      contador = contador + 1;
    }
    diferenciaIntroducido = el.total_current_inventory_item - totalIntroducido;
    // if (!diferenciaIntroducido === 0) {
    arrayIntroducido.push(
      el.name_item,
      el.total_current_inventory_item,
      totalIntroducido,
      diferenciaIntroducido,
      contador
    );
    //}
  }
  console.log("arrayIntroducido", arrayIntroducido); */
  //  fin de la rutina
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
      probando: arrayIntroducido,
    });
    return;
  }
  /*   // codigo temporal para actualizar la tabla item el stock
  let idItem = 0;
  let totalStock = 0;
  for (const el of data) {
    idItem = el.id_item_current_inventory_item;
    totalStock = el.total_current_inventory_item;
    console.log("idItem", idItem, "totalStock", totalStock);
    const resultNew2 = await db.sequelize.query(
      ` UPDATE item SET stock_item = ${totalStock} WHERE item.id_item = ${idItem}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
      }
    );
    const resultNew3 = await db.sequelize.query(
      ` UPDATE current_inventory_item SET initial = ${totalStock} WHERE current_inventory_item.id_item_current_inventory_item = ${idItem} AND current_inventory_item.id_stock_current_inventory_item = ${variable4}`,
      {
        type: QueryTypes.UPDATE, // Tipo de consulta
      }
    );
  } */
  res.status(200).json(data);
/*   res.status(200).json({
    data: data,
    array: arrayIntroducido,
  }); */
  // res.json({ message: resAllQuerys });
};

export const getCurrent_inventory_itemReport = async (req, res) => {
  // rutas - routes
  let variable = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT  *, total_current_inventory_item, name_item, id_family_item, name_family from current_inventory_item INNER JOIN item on current_inventory_item.id_item_current_inventory_item=item.id_item  INNER JOIN family on item.id_family_item = family.id_family where current_inventory_item.id_stock_current_inventory_item = ${variable} ORDER BY name_family, name_item`,
    { type: QueryTypes.SELECT }
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  res.status(200).json(data);
};

export const getCurrent_inventory_itemdetailQuerySql2 = async (req, res) => {
  let variable = req.params.variable;
  const data = await db.sequelize.query(
    `SELECT  id_stock_detail_item, id_item_stock_detail_item id_container_stock_detail_item, id_place_stock_detail_item, id_stock_stock_detail_item, qty_container_stock_detail_item, units_stock_detail_item, total_stock_detail_item, name_item, code_item, name_container, qty_container FROM stock_detail_item INNER join item on stock_detail_item.id_item_stock_detail_item=item.id_item INNER JOIN container on stock_detail_item.id_container_stock_detail_item=id_container where id_stock_stock_detail_item = ${variable} ORDER BY stock_detail_item.id_stock_detail_item;`,

    {
      type: QueryTypes.SELECT,
    }
  ); //
  if (data.length <= 0) {
    res.status(204).json({
      code: 204,
      message: "Results not found",
    });
    return;
  }
  //console.log("json", data);
  res.status(200).json(data);
};

export const getCurrent_inventory_item = async (req, res) => {
  //quitar _ y usar camelcase
  console.log("ojo ver akika manin uno ", req.params);
  let variable = req.params.variable;
  console.log("ojo ver akika manin 2 ", req.query);
  let resultGetOne = await Current_inventory_item.findOne({
    where: {
      id_current_inventory_item: variable,
    },
  });
  //console.log("aca no veo nada", resultGetOne);

  if (_.isEmpty(resultGetOne)) {
    return res.status(404).json({
      message: "Results not found",
      otramas: " esto tambien ",
      success: false,
    });
  }
  let prueba = "pasarla";
  let prueba2 = [1, 2, 3, 4, 5];

  //console.error("error del getone", resultGetOne);
  //return res.status(200).json({ ...resultGetOne.toJSON(), success: true });
  return res.status(200).json({ resultGetOne, success: true, prueba, prueba2 });
};

export const createCurrent_inventory_item = async (req, res) => {
  //console.log("req.body", req.body);
  const resultNew = await Current_inventory_item.create({
    id_stock_current_inventory_item: req.body.idstockcurrentinventoryitem,
    id_item_current_inventory_item: req.body.iditemcurrentinventoryitem,
    total_current_inventory_item: req.body.totalcurrentinventoryitem,
  });
  Object.entries(resultNew).length === 0
    ? res.json({ message: "Register is not created" })
    : res.json({ message: resultNew });
};

export const updateCurrent_inventory_item = async (req, res) => {
  try {
    const obj = req.body;
    const id_current_inventory_item = req.body.id_current_inventoryitem;
    let resultUpdate = await Current_inventory_item.update(obj, {
      where: {
        id_current_inventory_item: id_current_inventory_item,
      },
    });
    //res.json({ message: "User Update successfully" });
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
    //console.log("aca solo el error", err);
  }
};

export const deleteCurrent_inventory_item = async (req, res) => {
  try {
    console.log(req.body);
    const id_item_current_inventory_item = req.body.id;
    let resultDelete = await Current_inventory_item.destroy({
      where: {
        id_item_current_inventory_item,
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

export const generatePDF = async function (req, res) {
  /* const { base64Content } = req.body;

  if (!base64Content) {
    return res
      .status(400)
      .send("Contenido base64 no proporcionado en el cuerpo de la solicitud.");
  }
  const htmlBody = Buffer.from(base64Content, "base64").toString("utf-8");
  // Iniciar el navegador Puppeteer en el nuevo modo headless
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    // Abrir una nueva página
    const page = await browser.newPage();
    // Configurar estilos de página para asegurar que cada página tenga un encabezado y un pie de página
    await page.addStyleTag({
      content: `
        @page {
          margin: 0px;
          width:100%;
          size: A4;
          font-size: 18px;
          @top-center {
            content: element(header);
          }
          @bottom-center {
            content: element(footer);
          }
        }
        #header {
          text-align: center;
          font-size: 12px;
        }
        #footer {
          text-align: center;
          font-size: 12px;
        }
      `,
    });
    // Configurar el contenido de la página
    await page.setContent(htmlBody);
    // Generar el PDF
    const pdfBuffer = await page.pdf({
      printBackground: true, // Incluir estilos de fondo
      margin: {
        //top: "80px", // Altura del encabezado
        //bottom: "100px", // Altura del pie de página
        top: "20px", // Altura del encabezado
        bottom: "10px", // Altura del pie de página
      },
    });
    // Configurar la respuesta HTTP
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="example.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error interno al generar el PDF");
  } finally {
    // Cerrar el navegador después de completar la operación
    await browser.close();
  }
    */
};

export const generateNewPDF = async function (req, res) {
  /*  function convertirPDF() {
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 80);
    doc.save("a4.pdf");
  }

  convertirPDF(); */
};
