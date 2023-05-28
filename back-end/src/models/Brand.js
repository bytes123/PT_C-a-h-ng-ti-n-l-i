"use strict";
const { db, sqlConnection } = require("./../db");
const { Sequelize } = require("sequelize");
var moment = require("moment");
var Brand = {
  getAllBrand: function (callback) {
    let sql = `SELECT b.*,br.name branch_name from brands b INNER JOIN branches br ON b.branch_id = br.id`;
    return sqlConnection.query(sql, callback);
  },
  getBrandExists: (data, callback) => {
    if (data?.name) {
      let sql = `SELECT * FROM brands WHERE name = N'${data.name}' AND branch_id = '${data.branch_id}'`;
      console.log(sql);
      return sqlConnection.query(sql, callback);
    } else {
      return sqlConnection.query(callback);
    }
  },
  getMailExists: (data, callback) => {
    let sql = `SELECT * FROM brands WHERE email = '${data?.email}' AND branch_id = '${data.branch_id}'`;
    return sqlConnection.query(sql, callback);
  },
  getPhoneNumberExists: (data, callback) => {
    let sql = `SELECT * FROM brands WHERE phone_number = '${data?.phone_number}' AND branch_id = '${data.branch_id}'`;
    return sqlConnection.query(sql, callback);
  },
  addBrand: (data, callback) => {
    data.createdAt = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY/MM/DD HH:mm:ss"
    );

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((value) => (typeof value === "string" ? `N'${value}'` : value))
      .join(", ");

    const sql = `INSERT INTO brands (${columns}) VALUES (${values})`;
    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  updateBrand: (data, callback) => {
    let query = [];

    data.brand.updatedAt = moment(
      data.brand.updatedAt,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY/MM/DD HH:mm:ss");

    Object.keys(data.brand).forEach((key) => {
      query.push(`${key} = '${data.brand[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE brands SET ${query} WHERE id = '${data.current_id}'`;

    return sqlConnection.query(sql, callback);
  },
  deleteBrand: (data, callback) => {
    let sql = `DELETE  FROM brands WHERE id = '${data.id}'`;

    return sqlConnection.query(sql, callback);
  },
  searchBrand: (data, callback) => {
    let sql = `SELECT b.*,br.name branch_name FROM brands b INNER JOIN branches br ON b.branch_id = br.id WHERE b.name LIKE '${data.value}%'`;
    return sqlConnection.query(sql, callback);
  },
};

module.exports = Brand;
