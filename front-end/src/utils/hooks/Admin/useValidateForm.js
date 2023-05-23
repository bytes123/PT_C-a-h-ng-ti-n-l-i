import React, { useEffect, useState } from "react";

export default function useValidateForm(callback) {
  const [values, setValues] = useState({});
  const [sendValues, setSendValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeValue = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    if (e.target.type == "file") {
      setValues({
        ...values,
        [e.target.name]: e.target.files[0],
      });
      setSendValues({
        ...sendValues,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
      setSendValues({
        ...sendValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelect = (value, name) => {
    setValues({
      ...values,
      [name]: value,
    });
    setSendValues({
      ...sendValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSetValue = (data) => {
    setValues(data);
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearValues = () => {
    setValues({});
    setSendValues({});
  };

  const submit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log(sendValues);
  }, [sendValues]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(sendValues);
    }
  }, [errors]);

  return {
    values,
    sendValues,
    handleChangeValue,
    submit,
    errors,
    clearErrors,
    clearValues,
    handleSetValue,
    handleSelect,
  };
}
