import React,{useContext, useEffect, useState} from "react";
import JoblyApi from "./JoblyAPI";
import CurrentUserContext from "./CurrentUserContext";


function JobDetail({job,handle}) {
    const [company,setCompany] = useState('')
    const currentUser = useContext(CurrentUserContext);
    const [isApplied, setIsApplied] = useState(false);
    // console.log(job)
    
    async function getCom() {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company)
    };

    useEffect(()=>{
        if(job){
            getCom()
        }else{
            console.log("error!!!")
        }
    
    },[])

    async function applyJob(){
        await JoblyApi.applyForJob(currentUser.username, job.id);
        setIsApplied(true);
    }


    const handleSubmit = () => {
        console.log(currentUser.username);
        console.log(job.id)
        applyJob();
        
    }


    return (
        <>
         <div>
            <h3>{job.title}</h3>
            <h4>{company.name}</h4>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
            <form>
                <button type="button" onClick={() => handleSubmit()}>{isApplied ? "Applied" : "Apply "}</button>
            </form>
            
         </div>
        </> 
    )
}

export default JobDetail;