import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { ErrorMessage, Form, FormInput, SubmitButton } from "../common/Form";
import { login, getCurrentUser } from "../services/authService";

const LoginForm = ({ location }) => {
  const [error, setError] = useState(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().label("Email").email(),
    password: Yup.string().required().label("Password"),
  });
  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;

      // Call server
      await login(email, password);

      // Redirect to home page or previous page
      const { state } = location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) setError(ex.response.data);
    }
  };

  if (getCurrentUser()) return <Redirect to="/" />;

  return (
    <div>
      <h1>Login</h1>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormInput name="email" label="Email" type="email" autoFocus />
        <FormInput name="password" label="Password" type="password" />
        <SubmitButton title="Login" />
      </Form>
    </div>
  );
};

export default LoginForm;
