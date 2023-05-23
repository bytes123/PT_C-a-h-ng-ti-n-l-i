"use strict";

const Cart = require("../models/Cart");

var fs = require("fs");
const { json } = require("express");

module.exports = {
  addCart: (req, result) => {
    const { user, product, quantity } = req.body;

    const { user_name } = user;

    const cartData = {
      user_name: user_name,
      status: 1,
      createdAt: new Date(),
    };

    Cart.getExistCart(user_name, (err, res) => {
      if (err) return result.status(500).json("ADD_FAILED");
      if (res.length) {
        const { id } = res[0];

        const detailCartData = {
          cart_id: id,
          detail_product_id: product.id,
          quantity: quantity,
        };

        Cart.getExistDetailCart(detailCartData, (err, res) => {
          if (err) return result.status(500).json("ADD_FAILED");
          if (res.length) {
            const { id } = res[0];
            const detailtCartUpdateData = {
              id: id,
              quantity: quantity,
              updatedAt: new Date(),
            };
            Cart.updateQuantityDetailCart(detailtCartUpdateData, (err, res) => {
              console.log(err);
              if (err) return result.status(500).json("ADD_FAILED");
              return result.status(200).json("ADD_SUCCESS");
            });
          } else {
            Cart.addDetailCart(detailCartData, (err, res) => {
              if (err) return result.status(500).json("ADD_FAILED");
              return result.status(200).json("ADD_SUCCESS");
            });
          }
        });
      } else {
        Cart.addCart(cartData, (err, cart_id) => {
          if (err) return result.status(500).json("ADD_FAILED");
          if (cart_id) {
            const detailCartData = {
              cart_id: cart_id,
              detail_product_id: product.id,
              quantity: quantity,
            };

            Cart.getExistDetailCart(detailCartData, (err, res) => {
              if (err) return result.status(500).json("ADD_FAILED");
              if (res.length) {
                const { id } = res[0];
                const detailtCartUpdateData = {
                  id: id,
                  quantity: quantity,
                  updatedAt: new Date(),
                };
                Cart.updateQuantityDetailCart(
                  detailtCartUpdateData,
                  (err, res) => {
                    console.log(err);
                    if (err) return result.status(500).json("ADD_FAILED");
                    return result.status(200).json("ADD_SUCCESS");
                  }
                );
              } else {
                Cart.addDetailCart(detailCartData, (err, res) => {
                  if (err) return result.status(500).json("ADD_FAILED");
                  return result.status(200).json("ADD_SUCCESS");
                });
              }
            });
          } else {
            return result.status(500).json("ADD_FAILED");
          }
        });
      }
    });
  },
  updateCart: (req, result) => {
    const data = req.body;

    if (data?.cart?.length) {
      data.cart.forEach((item) => {
        const detail_cart = {
          id: item.id,
          cart_id: item.cart_id,
          detail_product_id: item.detail_product_id,
          quantity: item.quantity,
          checked: item.checked,
        };

        Cart.updateDetailCart(detail_cart, (err, res) => {
          if (err) return result.status(500).json("UPDATE_FAILED");
        });
      });
    }
    if (data?.deleteList?.length) {
      data.deleteList.forEach((item) => {
        Cart.deleteDetailCart(item, (err, res) => {
          if (err) return result.status(500).json("UPDATE_FAILED");
        });
      });
    }

    return result.status(200).json("UPDATE_SUCCESS");
  },
  getCart: (req, result) => {
    const { user_name } = req.body;

    Cart.getCart(user_name, (err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res);
    });
  },
};
