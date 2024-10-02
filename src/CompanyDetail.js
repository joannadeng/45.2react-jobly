import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import JoblyApi from "./JoblyAPI";
import JobDetail from "./JobDetail";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import { useContext } from "react";

function CompanyDetail() {
    const [company, setCompany] = useState('');
    const params = useParams();
    const handle = params.handle;
    const currentUser = useContext(CurrentUserContext)
    const navigate = useNavigate();

    async function getCom() {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company)
    };

    function redirectHome() {
        navigate('/')
    }

    useEffect(() => {
        if(currentUser){
            getCom();
          }else{
           redirectHome()
          }
    },[currentUser,handle])

    return (
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            {company.jobs?.map((job,idx) => (
                <JobDetail key={idx} job={job} handle={company.handle}/>
            ))}
        </div>
    )


}

export default CompanyDetail;