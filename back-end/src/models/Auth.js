"use strict";
const { db } = require("./../db");

var Auth = {
  setToken: function (data, callback) {
    let sql = "INSERT INTO authen SET ?";
    return db.query(sql, [data], callback);
  },
  getToken: function (data, callback) {
    let sql = "SELECT * FROM authen WHERE auth_token = ?";
    return db.query(sql, [data.auth_token], callback);
  },
  deleteTokenExpired: (callback) => {
    let sql =
      "DELETE FROM authen WHERE createdAt < DATE_SUB(NOW(), INTERVAL 30 MINUTE)";
    return db.query(sql, callback);
  },
  deleteToken(data, callback) {
    let sql = "DELETE FROM authen WHERE auth_token = ?";
    return db.query(sql, [data.auth_token], callback);
  },
  authUser: (data, callback) => {
    let sql =
      "UPDATE users SET isAuth = 1 WHERE user_name = (SELECT users.user_name from authen INNER JOIN users ON authen.auth_token = ? AND  authen.user_name = users.user_name)";
    return db.query(sql, [data.auth_token], callback);
  },
};

module.exports = Auth;
