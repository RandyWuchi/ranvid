import React from "react";

const ErrorMessage = ({ visible, error }) => {
  if (!visible || !error) return null;

  return <div className="alert alert-danger">{error}</div>;
};

export default ErrorMessage;
