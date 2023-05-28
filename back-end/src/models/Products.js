"use strict";
const { db, sqlConnection } = require("./../db");
const { Sequelize } = require("sequelize");
var moment = require("moment");
var Products = {
  getAllProduct: function (callback) {
    let sql = `SELECT p.*,br.id branch_id,c.name as category_name,b.name as brand_name,br.name branch_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id INNER JOIN branches br ON br.id = c.branch_id AND br.id = b.branch_id  ORDER BY p.createdAt DESC`;
    return sqlConnection.query(sql, callback);
  },

  getProductsByCategory: (data, callback) => {
    let sql = `SELECT p.* FROM products p INNER JOIN categories c ON c.id = p.category_id INNER JOIN branches br ON br.id = c.branch_id WHERE c.id = '${data.id}' AND br.id = 'CN1'`;
    return sqlConnection.query(sql, callback);
  },
  getProductById: (product_id, callback) => {
    let sql = `SELECT p.*,c.name category_name,c.id category_id,b.name brand_name FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id  WHERE p.id = '${product_id}'`;

    return sqlConnection.query(sql, callback);
  },
  addProduct: (data, callback) => {
    data.createdAt = moment(data.createdAt, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY/MM/DD HH:mm:ss"
    );

    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((value) => (typeof value === "string" ? `N'${value}'` : value))
      .join(", ");

    const sql = `INSERT INTO products (${columns}) VALUES (${values})`;

    return sqlConnection.query(sql, callback);
  },
  updateProduct: (data, callback) => {
    let query = [];

    data.product.updatedAt = moment(
      data.product.updatedAt,
      "YYYY-MM-DD HH:mm:ss"
    ).format("YYYY/MM/DD HH:mm:ss");

    Object.keys(data.product).forEach((key) => {
      query.push(`${key} = '${data.product[key]}'`);
    });

    query = query.join(",", "");

    let sql = `UPDATE products SET ${query} WHERE id = N'${data.id}'`;

    console.log(sql);
    return sqlConnection.query(sql, callback);
  },
  deleteProduct: (id, callback) => {
    console.log(id);
    let sql = `DELETE FROM PRODUCTS WHERE id = '${id}'`;
    return sqlConnection.query(sql, callback);
  },
  searchProduct: (data, callback) => {
    let sql = `SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id AND p.name LIKE '${data.value}%' `;
    return sqlConnection.query(sql, callback);
  },
};

module.exports = Products;
