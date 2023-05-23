"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");

var Rate = {
  getRates: (callback) => {
    let sql = `SELECT r.*,p.name,dt.size FROM rates r INNER JOIN detail_products dt ON dt.id = r.detail_product_id INNER JOIN products p ON p.id = dt.product_id ORDER BY createdAt DESC`;

    return db.query(sql, callback);
  },
  addRate: (data, callback) => {
    let sql = "INSERT INTO rates SET ?";

    return db.query(sql, [data], callback);
  },
  getRateByProductId: function (product_id, callback) {
    let sql = `SELECT r.*,u.avatar,dt.size,p.name FROM rates r INNER JOIN detail_products dt ON dt.id = r.detail_product_id INNER JOIN products p ON p.id = dt.product_id LEFT JOIN users u ON u.user_name = r.user_name WHERE p.id = ? AND r.statement = 'success'`;
    return db.query(sql, product_id, callback);
  },
  searchRate: (data, callback) => {
    let sql =
      "SELECT r.*,p.name,dt.size FROM rates r INNER JOIN detail_products dt ON dt.id = r.detail_product_id INNER JOIN products p ON p.id = dt.product_id  WHERE r.detail_product_id LIKE ? OR p.name LIKE ? ORDER BY createdAt DESC";
    return db.query(sql, [`${data.value}%`, `${data.value}%`], callback);
  },
  updateStatement: (data, callback) => {
    let sql = `UPDATE rates SET statement = ? WHERE id = ?`;

    return db.query(sql, [data.statement, data.id], callback);
  },
};

module.exports = Rate;
