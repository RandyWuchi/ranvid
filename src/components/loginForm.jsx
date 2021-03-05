import React from "react";
import { Form, FormInput, SubmitButton } from "../common/Form";
import * as Yup from "yup";

const LoginForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().label("Email").email(),
    password: Yup.string().required().label("Password"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call server
    console.log("submitted");
  };
  return (
    <div>
      <h1>Login</h1>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormInput name="email" label="Email" type="email" autoFocus />
        <FormInput name="password" label="Password" type="password" />
        <SubmitButton title="Login" />
      </Form>
    </div>
  );
};

export default LoginForm;
