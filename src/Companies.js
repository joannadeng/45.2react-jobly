import React, { useEffect, useState, useContext } from "react";
import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import JoblyApi from "./JoblyAPI";
import CurrentUserContext from "./CurrentUserContext";


function Companies() {

    const [companies, setCompanies] = useState([]);
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();

    async function getComs() {
        let res = await JoblyApi.getCompanies();
        setCompanies(res);
    };

    function redirectHome() {
       navigate('/')
    }

    useEffect(()=>{
      if(currentUser){
        getComs();
      }else{
       redirectHome()
      }
    },[currentUser])
    
    
    return (
        <>
        { companies.map((com,key) => ( 
              <div  key={key} onClick={()=>{
                navigate(`/companies/${com.handle}`)
              }}>
                <h6>{com.name}</h6>
                <p>{com.description}</p>
              </div >
        )) }
        </>
    )

}

export default Companies;