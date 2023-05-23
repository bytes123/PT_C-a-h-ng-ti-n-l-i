import React, { useEffect, useState } from "react";
import {
  userPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";
import { Form } from "antd";
export default function useSignUp(imgData, callback, updateValues) {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState({});
  const [placeHolder, setPlaceHolder] = useState(userPlaceHolder);
  const initialValue = {
    gender: "Nam",
  };

  const [newValues, setNewValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (updateValues) {
      if (updateValues?.gender) {
        setNewValues({
          gender: updateValues.gender,
        });
      }
      setChecked(
        ...updateValues.detail_type_user.map((item) => ({
          [item.type_user_id]: true,
        }))
      );
    }
  }, [updateValues]);

  // cập nhật form khi thay đổi avatar
  useEffect(() => {
    if (imgData?.file) {
      setNewValues({
        ...newValues,
        avatar: imgData.file,
      });
    }
  }, [imgData]);

  const handleChangeGender = (e) => {
    setNewValues({
      gender: e.target.value,
    });
  };

  // Cập nhật khi thay đổi value mới cho submit
  useEffect(() => {
    if (Object.keys(newValues).length > 1) {
      setIsChange(true);
    }
  }, [newValues]);

  // cập nhật form khi thay đổi quyền
  const handlePermission = (type_user_id) => {
    setChecked({
      ...checked,
      [type_user_id]: !checked[type_user_id],
    });
  };

  const handleUpdatePermission = (type_user_id, fetchChecked) => {
    if (checked && checked[type_user_id]) {
      setChecked({
        ...checked,
        [type_user_id]: !checked[type_user_id],
      });
      setNewValues({
        ...newValues,
        type_user: !checked[type_user_id],
      });
    } else {
      setChecked({
        ...checked,
        [type_user_id]: !fetchChecked,
      });
      setNewValues({
        ...newValues,
        type_user: !fetchChecked,
      });
    }
  };

  const clearChecked = () => {
    setChecked({});
  };

  useEffect(() => {
    if (!updateValues) {
      const trueKeys = Object.keys(checked).filter(
        (key) => checked[key] === true
      );

      setNewValues({
        ...newValues,
        type_user: trueKeys,
      });
    }
  }, [checked]);

  const handleSubmit = (data) => {
    if (!updateValues) {
      setNewValues({
        ...newValues,
        ...data,
      });
    }
    setIsSubmit(true);
  };

  const clearUser = () => {
    setNewValues(initialValue);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(userPlaceHolder);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback(newValues);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return {
    form,
    newValues,
    setNewValues,
    handlePermission,
    handleUpdatePermission,
    checked,
    setErrors,
    placeHolder,
    handleSubmit,
    handleBlurPlaceHolder,
    handleFocusPlaceHolder,
    errors,
    clearErrors,
    clearUser,
    clearChecked,
    isChange,
    handleChangeGender,
  };
}
