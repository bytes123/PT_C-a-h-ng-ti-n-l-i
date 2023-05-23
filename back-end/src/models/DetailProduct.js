"use strict";
const db = require("./../db");

var DetailProduct = {
  getAllDetailProduct: function (callback) {
    let sql =
      "SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id ORDER BY createdAt DESC";
    return db.query(sql, callback);
  },
  getTopProducts: function (quantity, callback) {
    let sql =
      "SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id GROUP BY p.id ORDER BY p.createdAt DESC LIMIT ?";
    return db.query(sql, quantity, callback);
  },
  getTopProductsByCategory: function (data, callback) {
    let sql =
      "SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id WHERE c.id = ? GROUP BY p.id ORDER BY p.createdAt DESC LIMIT ?";
    return db.query(sql, [data.category_id, data.quantity], callback);
  },
  getTopSellProducts: function (quantity, callback) {
    let sql =
      "SELECT dp.*,FLOOR(dp.price-dp.price*dp.discount/100) newPrice,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name,SUM(db.quantity) AS total_quantity FROM detail_products dp INNER JOIN products p ON dp.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN detail_bill db ON db.detail_product_id = dp.id  GROUP BY p.id ORDER BY total_quantity DESC LIMIT ?";
    return db.query(sql, quantity, callback);
  },
  getTopSellProductsByCategory: function (data, callback) {
    let sql =
      "SELECT dp.*,FLOOR(dp.price-dp.price*dp.discount/100) newPrice,p.name,p.image1,c.id as category_id,c.name as category_name,b.id as brand_id,b.name as brand_name,SUM(db.quantity) AS total_quantity FROM detail_products dp INNER JOIN products p ON dp.product_id = p.id INNER JOIN categories c ON c.id = p.category_id INNER JOIN brands b ON b.id = p.brand_id INNER JOIN detail_bill db ON db.detail_product_id = dp.id  WHERE c.id = ? GROUP BY p.id ORDER BY total_quantity DESC LIMIT ?";
    return db.query(sql, [data.category_id, data.quantity], callback);
  },
  getDetailByProductId: function (product_id, callback) {
    let sql = `SELECT dt.*, (SELECT COUNT(id) FROM RATES r WHERE r.detail_product_id = dt.id AND r.statement = 'success') AS rate_quantity, p.image1, p.name, FLOOR(dt.price-dt.price*dt.discount/100) AS newPrice
      FROM detail_products dt
      INNER JOIN products p ON p.id = dt.product_id
      WHERE dt.product_id = ?`;
    return db.query(sql, product_id, callback);
  },
  addDetailProduct: (data, callback) => {
    let sql = "INSERT INTO detail_products SET ?";
    return db.query(sql, [data], callback);
  },
  updateDetailProduct: (data, callback) => {
    console.log(data.id);
    let sql = "UPDATE detail_products SET ? WHERE id = ?";
    return db.query(sql, [data.detail_products, data.id], callback);
  },
  deleteDetailProduct: (id, callback) => {
    let sql = "DELETE FROM detail_products WHERE id = ?";
    return db.query(sql, [id], callback);
  },
  searchDetailProduct: (data, callback) => {
    let sql =
      "SELECT dt.*,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.name FROM detail_products dt INNER JOIN products p ON dt.product_id = p.id AND p.name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = DetailProduct;
