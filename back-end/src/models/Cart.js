"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");

var Cart = {
  addCart: (data, callback) => {
    let sql = "INSERT INTO cart SET ?";

    db.query(sql, [data], (error, result) => {
      if (error) {
        return callback(error);
      }

      let cart_id = result.insertId;

      return callback(null, cart_id);
    });
  },
  addDetailCart: (data, callback) => {
    let sql = "INSERT INTO detail_cart SET ?";

    return db.query(sql, [data], callback);
  },
  updateDetailCart: (data, callback) => {
    let sql = "UPDATE detail_cart SET ? WHERE id = ?";

    return db.query(sql, [data, data.id], callback);
  },
  deleteDetailCart: (data, callback) => {
    console.log(data);
    let sql = "DELETE FROM detail_cart WHERE id = ?";

    return db.query(sql, [data], callback);
  },
  updateQuantityDetailCart: (data, callback) => {
    let sql = "UPDATE detail_cart SET quantity = quantity + ? WHERE id = ?";

    return db.query(sql, [data.quantity, data.id], callback);
  },
  getExistCart: (user_name, callback) => {
    let sql = "SELECT * FROM cart WHERE user_name = ? AND status = 1";

    return db.query(sql, [user_name], callback);
  },
  getExistDetailCart: (data, callback) => {
    let sql =
      "SELECT * FROM detail_cart WHERE detail_product_id = ? AND cart_id = ?";

    return db.query(sql, [data.detail_product_id, data.cart_id], callback);
  },
  getCart: (user_name, callback) => {
    let sql = `SELECT dt.*,dp.size,p.name,p.image1,FLOOR(dp.price-dp.price*dp.discount/100) as newPrice,ct.name category_name,ct.id category_id,p.id product_id,dp.starpoint FROM cart c 
      INNER JOIN detail_cart dt ON c.id = dt.cart_id 
      INNER JOIN detail_products dp ON dp.id = dt.detail_product_id 
      INNER JOIN products p ON p.id = dp.product_id 
      INNER JOIN categories ct ON ct.id = p.category_id
      AND c.user_name = ?`;

    return db.query(sql, [user_name], callback);
  },
};

module.exports = Cart;
