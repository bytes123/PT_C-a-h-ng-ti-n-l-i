import React, { useState, useEffect } from "react";
import { loginedUser, expiredDate } from "./useAccessUser";
import {
  updateCart,
  addCart,
  resetAddCartStatus,
  getAddCartStatus,
  fetchCart,
  getCart,
  getUpdateCartStatus,
  resetUpdateCartStatus,
  addLocalCart,
} from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "lodash";
import { fetchProducts } from "../../features/product/productSlice";
import { useNavigate, useLocation } from "react-router-dom";

export default function useCart() {
  const add_cart_status = useSelector(getAddCartStatus);
  const update_cart_status = useSelector(getUpdateCartStatus);
  const fetch_cart = useSelector(getCart);
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartSubPrice, setCartSubPrice] = useState(0);
  const [cartCheckedPrice, setCheckedCartPrice] = useState(0);
  const [cartCheckedSubPrice, setCheckedCartSubPrice] = useState(0);
  const [error, setError] = useState({});
  const [shipPrice, setShipPrice] = useState(30000);
  const navigate = useNavigate();
  const location = useLocation();
  const [isChange, setIsChange] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [newCart, setNewCart] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (cart?.length) {
      let cartPrice = cart.reduce(
        (init, item) => init + item.quantity * item.newPrice,
        0
      );

      let cartPriceChecked = cart
        .filter((item) => item?.checked)
        .reduce((init, item) => init + item.quantity * item.newPrice, 0);
      setCheckedCartPrice(cartPriceChecked + shipPrice);
      setCheckedCartSubPrice(cartPriceChecked);
      setCartSubPrice(cartPrice);
      setCartPrice(cartPrice + shipPrice);
    }
  }, [cart]);

  useEffect(() => {
    if (fetch_cart.length) {
      setCart(fetch_cart);
    }
  }, [fetch_cart]);

  useEffect(() => {
    if (loginedUser) {
      onFetchCart(loginedUser);
    }
  }, [location]);

  const [isToast, setIsToast] = useState({
    style: "",
    value: false,
    body: "",
  });

  const resetToast = () => {
    setIsToast({
      style: "",
      value: false,
      body: "",
    });
  };

  const onFetchCart = (data) => dispatch(fetchCart(data)).unwrap();

  const addSuccess = async () => {
    await onFetchCart(loginedUser);
    setIsToast({
      position: "top-center",
      style: "success",
      value: true,
      body: "Thêm sản phẩm vào giỏ thành công",
    });
  };

  const updateSuccess = async () => {
    if (loginedUser) {
      await onFetchCart(loginedUser);
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) ?? [];

      setCart(savedCart);
    }

    setIsToast({
      position: "top-center",
      style: "success",
      value: true,
      body: "Cập nhật giỏ hàng thành công",
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (add_cart_status == "succeeded") {
      addSuccess();
    }

    return () => {
      dispatch(resetAddCartStatus());
      resetToast();
    };
  }, [add_cart_status]);

  useEffect(() => {
    if (update_cart_status == "succeeded") {
      updateSuccess();
    }

    return () => {
      dispatch(resetUpdateCartStatus());
      setIsChange(false);
      resetToast();
    };
  }, [update_cart_status]);

  const handleCheckOut = async () => {
    const cartChecked = cart.some((item) => item?.checked);

    if (cartChecked) {
      if (loginedUser) {
        await dispatch(
          updateCart({
            cart: cart,
          })
        );
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      setError({});
      navigate("/thanh-toan");
    } else {
      setError({
        msg: "Vui lòng chọn sản phẩm trước khi thanh toán",
      });
    }
  };

  useEffect(() => {
    const timerReset = () =>
      setTimeout(() => {
        resetToast();
      }, 100);

    if (error?.msg) {
      setIsToast({
        position: "top-center",
        style: "failed",
        value: true,
        body: error.msg,
      });
    }
    timerReset();
    return () => clearTimeout(timerReset);
  }, [error]);

  const handleAddCart = (e, item, quantity = 1) => {
    e.preventDefault();

    if (loginedUser) {
      const now = new Date();
      const isExpiring = now.getTime() < new Date(expiredDate).getTime();
      if (isExpiring) {
        const existingProductIndex = cart.findIndex(
          (product) => product.detail_product_id === item.id
        );

        if (existingProductIndex == -1) {
          if (quantity <= item.quantity) {
            dispatch(
              addCart({
                user: loginedUser,
                product: item,
                quantity: quantity,
              })
            ).unwrap();
          } else {
            setError({
              msg: "Vui lòng nhập số lượng không lớn hơn hàng tồn kho!",
            });
          }
        } else {
          console.log(existingProductIndex);
          const cartQuantity = cart.filter(
            (i) => i.detail_product_id == item.id
          )[0]?.quantity;

          if (cartQuantity + quantity <= item.quantity) {
            dispatch(
              addCart({
                user: loginedUser,
                product: item,
                quantity: quantity,
              })
            ).unwrap();
          } else {
            setError({
              msg: `Bạn đã có ${cartQuantity} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn hàng trong kho`,
            });
          }
        }
      } else {
        window.location.href = "/";
      }
    } else {
      const existingProductIndex = cart.findIndex(
        (product) => product.id === item.id
      );

      if (existingProductIndex !== -1) {
        const cartQuantity = cart.filter((i) => i.id == item.id)[0].quantity;
        if (cartQuantity + quantity <= item.quantity) {
          const updatedCart = cart.map((item, index) => {
            if (index == existingProductIndex) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          });
          dispatch(addLocalCart(updatedCart));
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setIsToast({
            position: "top-center",
            style: "success",
            value: true,
            body: "Thêm sản phẩm vào giỏ thành công",
          });
          setReset(!reset);
        } else {
          setError({
            msg: `Bạn đã có ${cartQuantity} sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn vào giỏ hàng vì sẽ vượt quá giới hạn hàng trong kho`,
          });
        }
      } else {
        if (quantity <= item.quantity) {
          dispatch(addLocalCart([...cart, { ...item, quantity: quantity }]));
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart, { ...item, quantity: quantity }])
          );
          setIsToast({
            position: "top-center",
            style: "success",
            value: true,
            body: "Thêm sản phẩm vào giỏ thành công",
          });
          setReset(!reset);
        } else {
          setError({
            msg: "Vui lòng nhập số lượng không lớn hơn hàng tồn kho!",
          });
        }
      }
    }
  };

  useEffect(() => {
    return () => resetToast();
  }, [reset]);

  useEffect(() => {
    if (!loginedUser) {
      const savedCart = JSON.parse(localStorage.getItem("cart")) ?? [];

      setCart(savedCart);
    }
  }, []);

  const handleUpQuantity = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      }
      return value;
    });
    setIsChange(true);
    setNewCart(newCart);
    setCart(newCart);
  };

  const handleDownQuantity = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id && value.quantity > 1) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      }
      return value;
    });
    setIsChange(true);
    setNewCart(newCart);
    setCart(newCart);
  };

  const handleChangeInputNumber = (input, id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: Number(input),
        };
      }
      return value;
    });
    setIsChange(true);
    setNewCart(newCart);
    setCart(newCart);
  };

  const handleAllCheck = (checked) => {
    const newCart = cart.map((value) => {
      return {
        ...value,
        checked: checked,
      };
    });
    setNewCart(newCart);
    setCart(newCart);
  };

  const handleCheckById = (id) => {
    const newCart = cart.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          checked: !value.checked,
        };
      }
      return value;
    });
    console.log(newCart);
    setNewCart(newCart);
    setCart(newCart);
  };

  const handleUpdateCart = () => {
    if (loginedUser) {
      if (isChange) {
        if (deleteList.length && newCart.length) {
          dispatch(
            updateCart({
              cart: newCart,
              deleteList: deleteList,
            })
          );
        } else if (deleteList.length && !newCart.length) {
          dispatch(
            updateCart({
              deleteList: deleteList,
            })
          );
        } else if (!deleteList.length && newCart.length) {
          dispatch(
            updateCart({
              cart: newCart,
            })
          );
        }
      } else {
        setError({
          msg: "Giỏ hàng không có thay đổi nào",
        });
      }
    } else {
      if (isChange) {
        localStorage.setItem("cart", JSON.stringify(newCart));
        dispatch(addLocalCart(newCart));
        setIsToast({
          position: "top-center",
          style: "success",
          value: true,
          body: "Cập nhật giỏ hàng thành công",
        });
      } else {
        setError({
          msg: "Giỏ hàng không có thay đổi nào",
        });
      }
    }
  };

  const handleDeleteCart = (id) => {
    setIsChange(true);
    if (!deleteList.length) {
      setDeleteList([id]);
    } else {
      if (!deleteList.includes(id)) {
        setDeleteList([...deleteList, id]);
      }
    }
    setNewCart(cart.filter((item) => item.id !== id));
    setCart(cart.filter((item) => item.id !== id));
  };

  return {
    handleAddCart,
    isToast,
    cart,
    onFetchCart,
    cartPrice,
    cartSubPrice,
    handleCheckOut,
    handleUpQuantity,
    handleDownQuantity,
    handleChangeInputNumber,
    handleAllCheck,
    handleCheckById,
    shipPrice,
    cartCheckedPrice,
    cartCheckedSubPrice,
    handleUpdateCart,
    handleDeleteCart,
    setError,
  };
}
