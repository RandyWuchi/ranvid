import React from "react";
import { Formik } from "formik";

const Form = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default Form;