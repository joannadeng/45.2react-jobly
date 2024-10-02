import React from 'react';
import { useFormik } from "formik";

const validate = values => {
    const errors = {} ;
    if(!values.firstName) {
        errors.firstName = 'Required';
    } 

    if(!values.lastName) {
        errors.lastName = 'Required';
    }

    if(!values.email) {
        errors.email = 'Required';
    }

    if(!values.username) {
        errors.username = 'Required';
    }

    if(!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

const SignupForm = ({signup}) => {
    const formik = useFormik({
        initialValues: {
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            email:''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            console.log(formik.values) //object
            signup(formik.values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}


          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
    
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
    
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
    
          <button type="submit">Submit</button>
        </form>
      );

}

export default SignupForm;
