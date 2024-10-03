import React,{ useContext} from 'react';
import CurrentUserContext from "./CurrentUserContext";
import JoblyApi from './JoblyAPI';
import './ProfileForm.css'
  

async function updateUserInfo(username,data) {
    let user = await JoblyApi.updateUser(username,data);
    return user
}

const ProfileForm = ({setCurrentUser}) => {
    const currentUser = useContext(CurrentUserContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const {firstName,lastName,email} = currentUser;
        let updatedProfileData = {firstName,lastName,email};
        try{
           let updatedUser = updateUserInfo(currentUser.username,updatedProfileData);
          setCurrentUser(updatedUser);
          console.log(currentUser)
           alert("Successfully Updated");
          //  navigate('/');
        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setCurrentUser(data => ({
            ...data,
            [name]:value
        }))
    }
    

    return (
        <form className="ProfileForm" onSubmit={handleSubmit}>
          <label className="ProfileForm-label" htmlFor="username">Username</label>
          <input
            className='ProfileForm-input'
            id="username"
            name="username"
            type="text"
            readOnly="readonly"
            value={currentUser.username}
          />
         

          <label className="ProfileForm-label" htmlFor="firstName">First Name</label>
          <input
            className='ProfileForm-input'
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={currentUser.firstName}
          />
    
          <label className="ProfileForm-label" htmlFor="lastName">Last Name</label>
          <input
            className='ProfileForm-input'
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={currentUser.lastName}
          />
         
          <label className="ProfileForm-label" htmlFor="email">Email</label>
          <input
            className='ProfileForm-input'
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={currentUser.email}
          />
          <button className='ProfileForm-btn' >Save</button>
        </form>
      );
}

export default ProfileForm;