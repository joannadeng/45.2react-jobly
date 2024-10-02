import React,{ useContext} from 'react';
import { useFormik } from "formik";
import CurrentUserContext from "./CurrentUserContext";
import JoblyApi from './JoblyAPI';
import { useNavigate } from 'react-router-dom';

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

    return errors;
}

async function updateUserInfo(username,data) {
    let user = await JoblyApi.updateUser(username,data);
    return user
}

const ProfileForm1 = ({setCurrentUser}) => {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username:currentUser.username,
            firstName:currentUser.firstName,
            lastName:currentUser.lastName,
            email:currentUser.email
        },
        validate,
        onSubmit: values => {
            const {username,firstName,lastName,email} = values;
            let updatedProfileData = {firstName,lastName,email};
            let updatedUser = updateUserInfo(username,updatedProfileData);
            setCurrentUser(currentUser => ({...currentUser,...updatedUser}));
            alert("Successfully Updated");
            navigate('/');
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
    
          <button type="button">Save</button>
        </form>
      );

}

export default ProfileForm1;