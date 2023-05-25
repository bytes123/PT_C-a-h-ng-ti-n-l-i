"use strict";
const { db } = require("./../db");
const { Sequelize } = require("sequelize");

var Products = {
  getAllProduct: function (callback) {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name,br.name branch_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id INNER JOIN branches br ON br.id = p.branch_id GROUP BY p.id  ORDER BY p.createdAt DESC";
    return db.query(sql, callback);
  },

  getProductsByCategory: (data, callback) => {
    let sql =
      "SELECT * FROM products WHERE category_id = ? AND branch_id = 'CN1'";
    return db.query(sql, [data.id], callback);
  },
  getProductById: (product_id, callback) => {
    let sql =
      "SELECT p.*,c.name category_name,c.id category_id,b.name brand_name FROM products p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id WHERE p.id = ? ";
    return db.query(sql, [product_id], callback);
  },
  addProduct: (data, callback) => {
    let sql = "INSERT INTO PRODUCTS SET ?";
    return db.query(sql, [data], callback);
  },
  updateProduct: (data, callback) => {
    let sql = "UPDATE PRODUCTS SET ? WHERE id = ?";
    return db.query(sql, [data.data, data.id], callback);
  },
  deleteProduct: (id, callback) => {
    console.log(id);
    let sql = "DELETE FROM PRODUCTS WHERE id = ?";
    return db.query(sql, [id], callback);
  },
  searchProduct: (data, callback) => {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id AND p.name LIKE ? AND p.branch_id = 'CN1'";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = Products;
