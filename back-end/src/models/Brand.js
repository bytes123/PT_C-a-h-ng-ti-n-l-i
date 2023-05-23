"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");
var Brand = {
  getAllBrand: function (callback) {
    let sql = "SELECT * from brands";
    return db.query(sql, callback);
  },
  getBrandExists: (data, callback) => {
    if (data?.name) {
      let sql = "SELECT * FROM brands WHERE name = ?";
      return db.query(sql, [data.name], callback);
    } else {
      return db.query(callback);
    }
  },
  getMailExists: (data, callback) => {
    if (data?.email) {
      let sql = "SELECT * FROM brands WHERE email = ?";
      return db.query(sql, [data.email], callback);
    } else {
      return db.query(callback);
    }
  },
  getPhoneNumberExists: (data, callback) => {
    if (data?.phone_number) {
      let sql = "SELECT * FROM brands WHERE phone_number = ?";
      return db.query(sql, [data.phone_number], callback);
    } else {
      return db.query(callback);
    }
  },
  addBrand: (data, callback) => {
    let sql = "INSERT INTO brands SET ?";

    return db.query(sql, [data], callback);
  },
  updateBrand: (data, callback) => {
    let sql = "UPDATE brands SET ? WHERE id = ?";

    return db.query(sql, [data.brand, data.current_id], callback);
  },
  deleteBrand: (data, callback) => {
    let sql = "DELETE  FROM brands WHERE id = ?";

    return db.query(sql, [data.id], callback);
  },
  searchBrand: (data, callback) => {
    let sql = "SELECT * FROM brands WHERE name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = Brand;
