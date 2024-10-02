import React,{ useContext, useState} from 'react';
import { useFormik } from "formik";
import CurrentUserContext from "./CurrentUserContext";
import JoblyApi from './JoblyAPI';
import { useNavigate } from 'react-router-dom';
  

async function updateUserInfo(username,data) {
    let user = await JoblyApi.updateUser(username,data);
    return user
}

const ProfileForm = ({setCurrentUser}) => {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const initialValues = {
        // username:currentUser.username,
        firstName:currentUser.firstName,
        lastName:currentUser.lastName,
        email:currentUser.email
    }
    const [formData,setFormData] = useState(initialValues)
       
    const handleSubmit = (e) => {
        e.preventDefault();
        const {firstName,lastName,email} = formData;
        let updatedProfileData = {firstName,lastName,email};
        try{
           let updatedUser = updateUserInfo(currentUser.username,updatedProfileData);
           setCurrentUser(currentUser => ({...currentUser,...updatedUser}));
           alert("Successfully Updated");
           navigate('/');
        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData(data => ({
            ...data,
            [name]:value
        }))
    }
    

    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            // onChange={handleChange}
            readonly="readonly"
            value={currentUser.username}
          />
         

          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={formData.firstName}
          />
    
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={formData.lastName}
          />
         
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
    
          <button >Save</button>
        </form>
      );

}

export default ProfileForm;