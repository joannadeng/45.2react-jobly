import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./JoblyAPI";
import CurrentUserContext from "./CurrentUserContext";
import JobDetail from "./JobDetail";

function Jobs() {
    const initialValues = {
        term:''
    }

    const [jobs, setJobs] = useState([])
    const [searchData,setSearchData] = useState(initialValues)
    const currentUser = useContext(CurrentUserContext)
    const navigate = useNavigate();
    
   

    async function getJobList() {
        let res = await JoblyApi.getJobs();
        setJobs(res);
        };

    function redirectHome() {
        navigate('/')
    }

    useEffect(() => {
        if(currentUser){
            getJobList();
          }else{
           redirectHome();
          }
    },[currentUser,searchData])

    function turnLowerCase(str) {
        if(typeof(str) === "string") {
            return str.toLocaleLowerCase();
        }
    }

    function getTermList(term) {
        const termList = jobs.filter(job => turnLowerCase(job.title).includes(turnLowerCase(term)))
        console.log(termList);
        setJobs(termList)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {term} = searchData;
        getTermList(term);
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setSearchData(data => ({
            ...data,
            [name]:value
        }))
    }

    
    return (
        <>
        
        <div>
            <form onSubmit={handleSubmit}>
               <input
                   type="text"
                   placeholder="Enter Search Term..."
                   name="term"
                   value={searchData.term}
                   onChange={handleChange}
               /> 
               <button>Search</button>
            </form>
            
            {jobs.map((job,idx) => (
                <JobDetail key={idx} job={job} handle={job.companyHandle}/>
            ))}
        </div>
        </>
    )

}

export default Jobs;