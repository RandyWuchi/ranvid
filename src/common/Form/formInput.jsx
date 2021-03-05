import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./errorMessage";

const FormInput = ({ name, width, label, ...rest }) => {
  const {
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
  } = useFormikContext();
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        className="form-control"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        width={width}
        {...rest}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default FormInput;
