"use strict";

const Branches = require("../models/Branches");
var fs = require("fs");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    Branches.getAllBranch((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
