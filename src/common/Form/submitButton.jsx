import { useFormikContext } from "formik";
import React from "react";

const SubmitButton = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
      {title}
    </button>
  );
};

export default SubmitButton;
