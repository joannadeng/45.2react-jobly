import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import './LoginForm.css'

const validate = values => {
    const errors = {};
    if(!values.username) {
        errors.username = 'Required';
    }
    if(!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

const LoginForm = ({login}) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validate,
        onSubmit: values => {
            login(values);
            navigate('/');
        },
    });

    return (
        <form className="loginform" onSubmit={formik.handleSubmit}>
            <label className="loginform-label" htmlFor="username">Username</label>
            <input
            className="loginform-input"
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}

            <label className="loginform-label" htmlFor="password">Password</label>
            <input
            className="loginform-input"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <button className="loginform-btn">Submit</button>
        </form>
    )
}

export default LoginForm;