import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";

function HomePage() {
    const navigate = useNavigate()
    const currentUser = useContext(CurrentUserContext);
    if(currentUser) {
        return (
            <div>
            <h1>Jobly</h1>
            <p>All the jobs in one convenient place</p>
            <h2>Welcome back, {currentUser.username}!</h2>
        </div>
        )
    }
    return (
        <div>
            <h1>Jobly</h1>
            <p>All the jobs in one convenient place</p>
            <button onClick={() => navigate('login')}>Log in</button> 
            <button onClick={() => navigate('signup')}>signup</button> 
        </div>
    )
}

export default HomePage;