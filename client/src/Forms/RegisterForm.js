import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../Services/auth";
import "../Styles/form.css";

let isFormValid = false;

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "*Email is required";
    isFormValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "*Invalid email address";
  }

  if (!values.password) {
    errors.password = "*Password is required";
  }

  if (!values.name) {
    errors.name = "*Name is required";
  }

  if (errors.email || errors.password || errors.name) {
    isFormValid = false;
  } else {
    isFormValid = true;
  }

  return errors;
};

const RegisterForm = () => {
  const history = useHistory();
  async function getUserData(values) {
    try {
      await authService.register(values.name, values.email, values.password);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      if (isFormValid) {
        getUserData(values);
      }
    },
  });
  return (
    <div className="container d-flex my-5 justify-content-center">
      <form onSubmit={formik.handleSubmit} className="input-form">
        <h1 className="input-form-title">Register</h1>
        <label>
          <input
            name="name"
            type="name"
            className="mt-2"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </label>
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger mb-3">{formik.errors.name}</div>
        ) : null}
        <label>
          <input
            name="email"
            type="email"
            className="mt-2"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger mb-3">{formik.errors.email}</div>
        ) : null}
        <label>
          <input
            type="password"
            name="password"
            className="mt-2"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger mb-3">{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="btn btn-success btn-lg btn-block">
          Sign Up
        </button>
        <p
          className="input-caption-text text-white"
          onClick={() => {
            history.push("/");
          }}
        >
          Already have account? Click here to LoginPage
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
