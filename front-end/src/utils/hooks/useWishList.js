import React, { useState } from "react";

export default function useWishList() {
  const [values, setValue] = useState([
    {
      id: 1,

      image:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg",
      name: "Field Roast Chao Cheese Creamy Original",
      starpoint: 4,
      price: 200000,
      quantity: 5,
      subtotal: "",
    },
    {
      id: 2,
      image:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg",
      name: "Field Roast Chao Cheese Creamy Original",
      starpoint: 4,
      price: 200000,
      quantity: 5,
      subtotal: "",
    },
  ]);

  const handleValues = (target) => {
    setValue({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleUpQuantity = (id) => {
    const newValues = values.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      }
      return value;
    });

    setValue(newValues);
  };

  const handleDownQuantity = (id) => {
    const newValues = values.map((value) => {
      if (value.id === id && value.quantity > 1) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      }
      return value;
    });

    setValue(newValues);
  };

  const handleChangeInputNumber = (input, id) => {
    const newValues = values.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: Number(input),
        };
      }
      return value;
    });

    setValue(newValues);
  };

  const handleAllCheck = (checked) => {
    const newValues = values.map((value) => {
      return {
        ...value,
        checked: checked,
      };
    });

    setValue(newValues);
  };

  const handleCheckById = (id) => {
    const newValues = values.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          checked: !value.checked,
        };
      }
      return value;
    });

    setValue(newValues);
  };

  return {
    values,
    handleValues,
  };
}
