"use strict";
const db = require("./../db");

var Bill = {
  getBill: (callback) => {
    let sql = `SELECT * FROM bills ORDER BY createdAt DESC`;

    return db.query(sql, callback);
  },
  getBillCreatedAtASC: (callback) => {
    let sql = `SELECT * FROM bills ORDER BY createdAt ASC`;

    return db.query(sql, callback);
  },
  getBillByStatement: (statement, callback) => {
    let sql = `SELECT * FROM bills WHERE bill_statement = ? ORDER BY createdAt DESC`;

    return db.query(sql, [statement], callback);
  },
  getBillByPayedStatement: (statement, callback) => {
    let sql = `SELECT * FROM bills WHERE bill_payed = ? ORDER BY createdAt DESC`;

    return db.query(sql, [statement], callback);
  },
  getBillByUserName: (id, callback) => {
    let sql = `SELECT * FROM bills WHERE user_name = ? ORDER BY createdAt DESC`;

    return db.query(sql, [id], callback);
  },
  getBillById: (bill_id, callback) => {
    let sql = `SELECT * FROM bills WHERE id = ? `;

    return db.query(sql, [bill_id], callback);
  },

  getDetailBill: (bill_id, callback) => {
    let sql = `SELECT db.*,b.bill_statement,r.statement rate_statement,p.name,p.id product_id,p.image1,dp.price,dp.size,FLOOR(dp.price-dp.price*dp.discount/100) currentPrice,FLOOR(dp.price-dp.price*dp.discount/100)*db.quantity newPrice,dp.discount FROM detail_bill db INNER JOIN detail_products dp ON db.detail_product_id = dp.id INNER JOIN products p ON p.id = dp.product_id INNER JOIN bills b ON b.id = db.bill_id LEFT JOIN rates r ON db.detail_bill_id = r.detail_bill_id WHERE bill_id = ?`;

    return db.query(sql, [bill_id], callback);
  },
  updateStatementBill: (data, callback) => {
    let sql = `UPDATE bills SET bill_statement = ? WHERE id = ?`;

    return db.query(sql, [data.bill_statement, data.id], callback);
  },
  updatePayedBill: (id, callback) => {
    let sql = `UPDATE bills SET bill_payed = 1 WHERE id = ?`;

    return db.query(sql, [id], callback);
  },
  searchBill: (data, callback) => {
    let sql = "SELECT * FROM bills WHERE id = ? OR phone_number = ?";
    return db.query(sql, [data.value, data.value], callback);
  },
  insertBill: (data, callback) => {
    let sql = `INSERT INTO bills SET ?`;

    return db.query(sql, [data], callback);
  },
  insertDetailBill: (data, callback) => {
    let sql = `INSERT INTO detail_bill SET ?`;

    return db.query(sql, [data], callback);
  },
  getBillById: (id, callback) => {
    let sql = `SELECT * FROM bills WHERE id = ?`;

    return db.query(sql, [id], callback);
  },
  getDetailBillById: (id, callback) => {
    let sql = `SELECT dt.*,db.quantity,FLOOR(dt.price-dt.price*dt.discount/100) newPrice,p.image1,p.id product_id FROM detail_bill db INNER JOIN detail_products dt ON db.detail_product_id = dt.id INNER JOIN products p ON dt.product_id = p.id  WHERE db.bill_id = ?`;

    return db.query(sql, [id], callback);
  },
};

module.exports = Bill;
