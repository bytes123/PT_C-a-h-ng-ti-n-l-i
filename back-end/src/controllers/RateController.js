"use strict";

const Rate = require("../models/Rate");

var fs = require("fs");
const { json } = require("express");

module.exports = {
  getRates: (req, result) => {
    Rate.getRates((err, rates) => {
      if (err) {
        console.log(err);
        return result.status(500).json(err);
      } else {
        return result.status(200).json(rates);
      }
    });
  },
  addRate: (req, result) => {
    const { rate, detail_bill_id } = req.body;

    rate.createdAt = new Date();

    Rate.addRate(rate, (err, res) => {
      if (err) {
        console.log(err);
        return result.status(500).json(err);
      } else {
        return result.status(200).json("ADD_SUCCESS");
      }
    });
  },
  searchRate: (req, result) => {
    const data = req.body;
    console.log(data);
    Rate.searchRate(data, (err, rates) => {
      if (err) throw err;
      return result.status(200).json(rates);
    });
  },

  updateStatement: (req, result) => {
    const data = req.body;
    console.log(data);
    Rate.updateStatement(data, (err, rates) => {
      if (err) throw err;
      return result.status(200).json("UPDATE_SUCCESS");
    });
  },
};
