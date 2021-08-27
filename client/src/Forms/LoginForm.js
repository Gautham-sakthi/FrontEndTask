import { useFormik } from "formik";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/Authprovider";
import { LoaderContext } from "../Provider/LoaderProvider";
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
  //check form is valid
  if (errors.email || errors.password) {
    isFormValid = false;
  } else {
    isFormValid = true;
  }

  return errors;
};

const LoginForm = () => {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);
  const { setLoader } = useContext(LoaderContext);

  async function getUserData(values) {
    try {
      setLoader(true);
      const response = await authService.login(values.email, values.password);
      setLoader(false);
      if (response) {
        setLoader(true);
        setToken(response?.["auth-token"]);
        localStorage.setItem("token", response?.["auth-token"]);
        setLoader(false);
        //todo:login issue
        history.push("/tracks");
        toast.dark(response.message);
      } else {
        toast.error("response not found");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
    validate,
    onSubmit: (values) => {
      if (isFormValid) {
        getUserData(values);
      } else {
        formik.validateForm();
      }
    },
  });
  return (
    <div className="container d-flex my-5 justify-content-center">
      <form onSubmit={formik.handleSubmit} className="input-form">
        <h1 className="input-form-title">Log In</h1>
        <label>
          <input
            name="email"
            type="email"
            className="mt-2"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
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
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger mb-3">{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="btn btn-success btn-lg btn-block">
          Login
        </button>
        <p
          className="input-caption-text text-white"
          onClick={() => {
            history.push("/register");
          }}
        >
          New user? Click here to register
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
