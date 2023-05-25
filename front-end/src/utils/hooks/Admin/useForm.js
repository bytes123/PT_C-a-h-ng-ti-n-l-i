import React, { useEffect, useState } from "react";

import { Form } from "antd";

import { useSelector } from "react-redux";
export default function useForm(
  callback,
  getErrors,
  formPlaceHolder,
  isUpdate = false
) {
  const [form] = Form.useForm();
  const [placeHolder, setPlaceHolder] = useState(formPlaceHolder);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [newValues, setNewValues] = useState({});
  let newrules = useSelector(getErrors);
  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleChangeValue = (name, value) => {
    setNewValues({
      ...newValues,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(newrules);
    setErrors(newrules);
  }, [newrules]);

  const handleSubmit = (data) => {
    if (!isUpdate) {
      setNewValues({
        ...newValues,
        ...data,
      });
    } else {
      setNewValues({
        ...newValues,
      });
    }
    setIsSubmit(true);
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(formPlaceHolder);
  };

  useEffect(() => {
    if (Object.keys(newValues).length > 0) {
      setIsChange(true);
    }
  }, [newValues]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback(newValues);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return {
    form,
    handleFocusPlaceHolder,
    handleSubmit,
    newValues,
    setNewValues,
    handleBlurPlaceHolder,
    placeHolder,
    isChange,
    errors,
    setErrors,
    handleChangeValue,
  };
}
