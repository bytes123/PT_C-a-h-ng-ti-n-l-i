"use strict";
const db = require("./../db");

var User = {
  getUser: (data, callback) => {
    let sql = "SELECT * FROM users WHERE user_name = ? ";
    return db.query(sql, [data.user_name], callback);
  },
  getAllUser: (callback) => {
    let sql = `
    SELECT * FROM (
      SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt,u.updatedAt, c.fullname,c.gender, c.province_id,c.province_name, c.district_id,c.district_name, c.ward_id,c.ward_name, c.phone_number, c.address, u.createdAt as order_date 
      FROM customers c 
      INNER JOIN users u ON u.user_name = c.user_name 
      WHERE u.isAuth = 1 
      UNION ALL 
      SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt,u.updatedAt, s.fullname,s.gender, s.province_id, s.province_name, s.district_id,s.district_name, s.ward_id,s.ward_name, s.phone_number, s.address, u.createdAt as order_date 
      FROM STAFFS s 
      INNER JOIN users u ON u.user_name = s.user_name 
      WHERE u.isAuth = 1 
    ) AS subquery
    ORDER BY order_date DESC
    
    
    ;
    
    `;
    return db.query(sql, callback);
  },
  getStaffs: (callback) => {
    let sql =
      "SELECT * FROM users u INNER JOIN staffs s ON u.user_name = s.user_name ORDER BY u.createdAt ";
    return db.query(sql, callback);
  },
  getAdminTypeUser: (callback) => {
    let sql =
      "SELECT * FROM type_user t INNER JOIN permissions p  ON t.permission_id = p.id AND p.name = 'Admin'";
    return db.query(sql, callback);
  },
  getCustomers: (callback) => {
    let sql =
      "SELECT * FROM users u INNER JOIN customers c ON u.user_name = c.user_name ORDER BY u.createdAt DESC";
    return db.query(sql, callback);
  },
  getAllDetailTypeUser: (callback) => {
    let sql = "SELECT * FROM detail_type_user ";
    return db.query(sql, callback);
  },
  getDetailTypeUser: (data, callback) => {
    let sql =
      "SELECT T.type_user_id FROM detail_type_user dt INNER JOIN users u ON dt.user_name = ? AND dt.user_name = u.user_name INNER JOIN type_user t ON dt.type_user_id = t.type_user_id ";
    return db.query(sql, [data.user_name], callback);
  },
  getUserConfirmed: (data, callback) => {
    let sql = `SELECT combined.*
        FROM (
          SELECT c.*, u.createdAt,u.password, u.isAuth, u.online, u.email, COALESCE(u.avatar, 'default.jpg') AS avatar
          FROM customers c
          LEFT JOIN staffs s ON c.user_name = s.user_name
          LEFT JOIN users u ON c.user_name = u.user_name
          WHERE c.user_name IS NOT NULL
          UNION ALL
          SELECT s.*, u.createdAt,u.password, u.isAuth, u.online, u.email, COALESCE(u.avatar, 'default.jpg') AS avatar
          FROM customers c
          RIGHT JOIN staffs s ON c.user_name = s.user_name
          LEFT JOIN users u ON s.user_name = u.user_name
          WHERE c.user_name IS NULL
        ) AS combined
        WHERE combined.isAuth = 1 AND combined.user_name = ?
        ORDER BY combined.createdAt DESC;
        `;
    return db.query(sql, [data.user_name], callback);
  },
  getUserByMail: (data, callback) => {
    let sql = "SELECT * FROM users WHERE email = ? AND isAuth = 1";
    return db.query(sql, [data.email], callback);
  },
  getUserAuth: (data, callback) => {
    let sql =
      "SELECT * FROM users WHERE user_name = ? AND email = ? AND isAuth = 1";
    return db.query(sql, [data.user_name, data.email], callback);
  },
  getUserByName: (data, callback) => {
    let sql = "SELECT * FROM users WHERE user_name = ?  AND isAuth = 1";
    return db.query(sql, [data.user_name], callback);
  },
  getUserNotAuth: (data, callback) => {
    let sql =
      "SELECT * FROM users WHERE user_name = ? OR  email = ? AND isAuth = 0";
    return db.query(sql, [data.user_name, data.email], callback);
  },
  deleteUserNotAuth: (data, callback) => {
    let sql =
      "DELETE FROM users WHERE user_name = ? OR email = ? AND isAuth = 0;";
    db.query(sql, [data.user_name, data.email], callback);
  },
  deleteUser: (data, callback) => {
    let sql = "DELETE FROM users WHERE user_name = ?";
    db.query(sql, [data.user_name], callback);
  },
  setUser: (data, callback) => {
    let sql = "INSERT INTO users SET ?;";
    db.query(sql, [data], callback);
  },
  updateUser: (data, callback) => {
    let sql = "UPDATE users SET ? WHERE user_name = ?";
    db.query(sql, [data.user, data.current_user_name], callback);
  },
  setCustomer: (data, callback) => {
    let sql = "INSERT INTO customers SET ?;";
    db.query(sql, [data], callback);
  },
  setStaff: (data, callback) => {
    let sql = "INSERT INTO staffs SET ?;";
    db.query(sql, [data], callback);
  },
  updateStaff: (data, callback) => {
    let sql = "UPDATE staffs SET ? WHERE user_name = ?";
    db.query(sql, [data.staff, data.current_user_name], callback);
  },
  checkDetailTypeUser: (data, callback) => {
    let sql =
      "SELECT * FROM detail_type_user WHERE user_name = ? AND type_user_id = ?";
    db.query(sql, [data.current_user_name, data.type_user_id], callback);
  },
  setDetailTypeUser: (data, callback) => {
    let sql = "INSERT INTO detail_type_user SET ?;";
    db.query(sql, [data], callback);
  },
  deleteDetailTypeUser: (data, callback) => {
    let sql =
      "DELETE FROM detail_type_user WHERE user_name = ? AND type_user_id = ? ";
    db.query(sql, [data.user_name, data.type_user_id], callback);
  },
  updateOnline: (data, callback) => {
    let sql = "UPDATE users SET online = ? WHERE user_name = ?";
    db.query(sql, [data.online, data.user_name], callback);
  },
  searchUser: (data, callback) => {
    let sql = `
      SELECT * FROM (
        SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt,u.updatedAt, c.fullname,c.gender, c.province_id,c.province_name, c.district_id,c.district_name, c.ward_id,c.ward_name, c.phone_number, c.address, u.createdAt as order_date 
        FROM customers c 
        INNER JOIN users u ON u.user_name = c.user_name 
        WHERE u.user_name LIKE ? OR u.email LIKE ? AND u.isAuth = 1 
        UNION ALL 
        SELECT u.user_name,u.avatar,u.email,u.isAuth,u.online,u.createdAt,u.updatedAt, s.fullname,s.gender, s.province_id, s.province_name, s.district_id,s.district_name, s.ward_id,s.ward_name, s.phone_number, s.address, u.createdAt as order_date 
        FROM STAFFS s 
        INNER JOIN users u ON u.user_name = s.user_name 
        WHERE u.user_name LIKE ? OR u.email LIKE ? AND u.isAuth = 1 
      ) AS subquery
      ORDER BY order_date DESC
      `;
    db.query(
      sql,
      [`${data.value}%`, `${data.value}%`, `${data.value}%`, `${data.value}%`],
      callback
    );
  },
};

module.exports = User;
