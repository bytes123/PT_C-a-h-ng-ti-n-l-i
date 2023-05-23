"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");

var Category = {
  getAllCategory: function (callback) {
    let sql = "SELECT * FROM categories";
    return db.query(sql, callback);
  },
  getCategoryExists: (data, callback) => {
    let sql = "SELECT * FROM categories WHERE name = ?";
    return db.query(sql, [data.name], callback);
  },
  addCategory: (data, callback) => {
    let sql = "INSERT INTO categories SET ?";

    return db.query(sql, [data], callback);
  },
  updateCategory: (data, callback) => {
    let sql = "UPDATE categories SET ? WHERE id = ?";

    return db.query(sql, [data.category, data.current_id], callback);
  },
  deleteCategory: (data, callback) => {
    let sql = "DELETE  FROM categories WHERE id = ?";

    return db.query(sql, [data.id], callback);
  },
  searchCategory: (data, callback) => {
    let sql = "SELECT * FROM categories WHERE name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
  Categories: () => {
    const categories = {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    };

    return categories;
  },
};

module.exports = Category;
