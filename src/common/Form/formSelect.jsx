import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./errorMessage";

const FormSelect = ({ name, label, instruction, options }) => {
  const { values, errors, touched, handleChange } = useFormikContext();
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {
        <select
          style={{ width: "100%" }}
          name={name}
          id={name}
          className="form-control"
          value={values[name]}
          onChange={handleChange}
        >
          <option defaultValue>{instruction}</option>
          {options.map((item) => (
            <option key={item._id} value={[item._id]}>
              {item.name}
            </option>
          ))}
        </select>
      }
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default FormSelect;
