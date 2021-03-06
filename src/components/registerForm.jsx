import React, { useState } from "react";
import * as Yup from "yup";

import { ErrorMessage, Form, FormInput, SubmitButton } from "../common/Form";
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";

const RegisterForm = () => {
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().label("Email").email(),
    password: Yup.string().min(6).required().label("Password"),
  });

  const handleSubmit = async (values) => {
    try {
      // Call server
      const response = await register(values);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setError(ex.response.data);
      }
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <Form
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormInput name="name" label="Name" type="text" autoFocus />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <SubmitButton title="Register" />
      </Form>
    </div>
  );
};

export default RegisterForm;
