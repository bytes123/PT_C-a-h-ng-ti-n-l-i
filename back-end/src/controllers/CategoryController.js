"use strict";

const Category = require("../models/Category");
const Products = require("../models/Products");
var fs = require("fs");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    Category.getAllCategory((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  getCategoryAndChildren: (req, res) => {
    Category.getAllCategory(async (err, categories) => {
      if (err) return res.status(400).json(err);

      const categoryPromises = categories.map(async (item, index) => {
        const products = await new Promise((resolve, reject) => {
          Products.getProductsByCategory(item, (err, products) => {
            if (err) reject(err);
            resolve(products);
          });
        });

        return { ...item, children: products };
      });

      const categoriesWithProducts = await Promise.all(categoryPromises);

      return res.status(200).json(categoriesWithProducts);
    });
  },
  addCategory: (req, result) => {
    function removeVietnameseAccents(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const data = req.body;

    data.name = data.name.trim();
    data.createdAt = new Date();
    data.id = removeVietnameseAccents(data.name).replace(" ", "-");

    Category.getCategoryExists(data, (err, res) => {
      if (!res.length) {
        Category.addCategory(data, (err, res) => {
          if (err) {
            return result.status(400).json(err);
          } else {
            return result.status(200).json("ADD_SUCCESS");
          }
        });
      } else {
        return result.status(400).json("CATEGORY_EXISTS");
      }
    });
  },
  updateCategory: (req, result) => {
    const data = req.body;
    data.name = data.name.trim();
    data.updatedAt = new Date();

    const category = {
      name: data.name,
      updatedAt: new Date(),
    };

    Category.getCategoryExists(data, (err, res) => {
      if (!res.length) {
        Category.updateCategory(
          {
            category: category,
            current_id: data.current_id,
          },
          (err, res) => {
            if (err) {
              return result.status(400).json(err);
            } else {
              return result.status(200).json("UPDATE_SUCCESS");
            }
          }
        );
      } else {
        return result.status(200).json("CATEGORY_EXISTS");
      }
    });
  },
  deleteCategory: (req, result) => {
    const data = req.body;

    Category.deleteCategory(data, async (err, res) => {
      if (!err) {
        return result.status(200).json("SUCCESS_DELETE");
      } else {
        console.log(err);
        return result.status(400).json("FAILED_DELETE");
      }
    });
  },
  searchCategory: (req, result) => {
    const data = req.body;
    console.log(data);
    Category.searchCategory(data, (err, categories) => {
      if (err) throw err;
      return result.status(200).json(categories);
    });
  },
};
