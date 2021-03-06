// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

import { logout } from "../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();

    // Redirect to the home page
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
