import React from "react";
import { Form, FormInput, SubmitButton } from "../common/Form";
import * as Yup from "yup";

const RegisterForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().label("Email").email(),
    password: Yup.string().min(6).required().label("Password"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call server
    console.log("submitted");
  };
  return (
    <div>
      <h1>Register</h1>
      <Form
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormInput name="name" label="Name" type="text" autoFocus />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <SubmitButton title="Register" />
      </Form>
    </div>
  );
};

export default RegisterForm;
