"use strict";
const { db, sqlConnection } = require("./../db");
const { Sequelize } = require("sequelize");
var moment = require("moment");
var Category = {
  getAllCategory: function (callback) {
    let sql = `SELECT c.*,b.name branch_name FROM dbo.categories c INNER JOIN branches b ON b.id = c.branch_id`;
    return sqlConnection.query(sql, callback);
  },
  getCategoryExists: (data, callback) => {
    let sql = `SELECT * FROM categories WHERE name = '${data.name}' AND branch_id = '${data.branch_id}'`;

    return sqlConnection.query(sql, callback);
  },
  addCategory: (data, callback) => {
    data.createdAt = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY/MM/DD HH:mm:ss"
    );

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((value) => (typeof value === "string" ? `N'${value}'` : value))
      .join(", ");

    const sql = `INSERT INTO categories (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  updateCategory: (data, callback) => {
    let query = [];

    data.category.updatedAt = moment(
      data.category.updatedAt,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY/MM/DD HH:mm:ss");

    Object.keys(data.category).forEach((key) => {
      query.push(`${key} = '${data.category[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE categories SET ${query} WHERE id = '${data.current_id}'`;

    return sqlConnection.query(sql, callback);
  },
  deleteCategory: (data, callback) => {
    let sql = `DELETE  FROM categories WHERE id = '${data.id}'`;

    return sqlConnection.query(sql, callback);
  },
  searchCategory: (data, callback) => {
    let sql = "SELECT * FROM categories WHERE name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = Category;
