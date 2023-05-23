"use strict";

const DetailProduct = require("../models/DetailProduct");
var fs = require("fs");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    DetailProduct.getAllDetailProduct((err, response) => {
      if (err) return res.status(400).json(err);
      const details_product = response.map((item) => {
        return {
          ...item,
          price: item.price + "",
          discount: item.discount + "",
        };
      });
      res.status(200).json(details_product);
    });
  },
  addDetailProduct: (req, result) => {
    const data = req.body;
    data.createdAt = new Date();
    DetailProduct.addDetailProduct(data, (err, response) => {
      if (err) return res.status(400).json("ADD_FAILED");
      console.log("Thành công");
      result.status(200).json("ADD_SUCCESS");
    });
    console.log(req.body);
  },
  updateDetailProduct: (req, result) => {
    const { id, ...detail_products } = req.body;
    detail_products.updatedAt = new Date();

    DetailProduct.updateDetailProduct(
      {
        detail_products,
        id,
      },
      (err, response) => {
        if (err) return result.status(400).json("UPDATE_FAILED");
        console.log("Thành công");
        result.status(200).json("UPDATE_SUCCESS");
      }
    );
  },
  deleteDetailProduct: (req, result) => {
    const { id } = req.body;
    DetailProduct.deleteDetailProduct(id, (err, res) => {
      if (err) {
        result.status(400).json("DELETE_FAILED");
      } else {
        console.log("thành công");
        result.status(200).json("DELETE_SUCCESS");
      }
    });
  },
  searchDetailProduct: (req, result) => {
    const data = req.body;
    DetailProduct.searchDetailProduct(data, (err, response) => {
      if (err) return res.status(400).json(err);
      const details_product = response.map((item) => {
        return {
          ...item,
          price: item.price + "",
          discount: item.discount + "",
        };
      });
      result.status(200).json(details_product);
    });
  },
};
