"use strict";
const db = require("./../db");

var Products = {
  getTable: function (callback) {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN category c ON p.category_id = c.id INNER JOIN brand b ON p.brand_id = b.id  ";
    return db.query(sql, callback);
  },
};

module.exports = Products;
