import React from "react";
import { Link } from "react-router-dom";

const Button = ({ title, path }) => {
  return (
    <Link to={path} className="btn btn-primary" style={{ marginBottom: 20 }}>
      {title}
    </Link>
  );
};

export default Button;
