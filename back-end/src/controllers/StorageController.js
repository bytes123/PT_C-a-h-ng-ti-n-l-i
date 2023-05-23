"use strict";

const Storage = require("../models/Storage");
var fs = require("fs");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    Storage.getAllStorage((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
