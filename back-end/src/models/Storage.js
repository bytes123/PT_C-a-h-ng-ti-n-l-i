"use strict";
const { db } = require("./../db");
const { Sequelize } = require("sequelize");

var Storage = {
  getAllStorage: function (callback) {
    let sql = "SELECT * FROM storages WHERE branch_id = 1";
    return db.query(sql, callback);
  },
};

module.exports = Storage;
