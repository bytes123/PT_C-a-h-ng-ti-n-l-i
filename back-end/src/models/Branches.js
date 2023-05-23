"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");

var Branches = {
  getAllBranch: function (callback) {
    let sql = "SELECT * FROM branches WHERE id != 1";
    return db.query(sql, callback);
  },
};

module.exports = Branches;
