"use strict";
const { db, sqlConnection } = require("./../db");
const { Sequelize } = require("sequelize");
var moment = require("moment");
var Category = {
  getAllCategory: function (callback) {
    let sql = `SELECT c.*,b.name branch_name FROM dbo.categories c INNER JOIN branches b ON b.id = c.branch_id ORDER BY c.createdAt DESC`;
    return sqlConnection.query(sql, callback);
  },
  getCategoryExists: (data, callback) => {
    let sql = `SELECT * FROM categories WHERE name = N'${data.name}' AND branch_id = '${data.branch_id}'`;

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
    console.log(sql);
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

    let sql = `UPDATE categories SET ${query} WHERE id = N'${data.current_id}'`;

    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  deleteCategory: (data, callback) => {
    let sql = `DELETE  FROM categories WHERE id = N'${data.id}'`;

    return sqlConnection.query(sql, callback);
  },
  searchCategory: (data, callback) => {
    let sql = `SELECT * FROM categories WHERE name LIKE N'${data.value}%'`;
    return sqlConnection.query(sql, callback);
  },
};

module.exports = Category;
