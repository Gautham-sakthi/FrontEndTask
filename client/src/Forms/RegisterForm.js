import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../Services/auth';
import '../Styles/form.css';


let isFormValid = false;

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
        isFormValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.name) {
        errors.name = 'Required';
    }

    if (errors.email || errors.password || errors.name) {
        isFormValid = false
    } else {
        isFormValid = true
    }

    return errors;
};

const RegisterForm = () => {
    const history = useHistory();
    async function getUserData(values) {
        try {
            await authService.register(values.name, values.email, values.password);
            history.push('/')
        } catch (err) {
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validate,
        onSubmit: values => {
            if (isFormValid) {
                getUserData(values)
            }
        },
    });
    return (
        <div className="container d-flex my-5 justify-content-center">
            <form onSubmit={formik.handleSubmit} className="login-form" >
                <h1 className="form-title">Register</h1>
                <label>
                    <input
                        name="name"
                        type="name"
                        className='mt-2'
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </label>
                <label>
                    <input
                        name="email"
                        type="email"
                        className='mt-2'
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        className='mt-2'
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </label>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>
                <p className="p" onClick={() => {
                    history.push('/')
                }}>Already have account? Click here to LoginPage</p>
            </form >
        </div>
    );
};

export default RegisterForm;