import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ window.localStorage.getItem('token')}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // signup route
  static async signup(data){
    let res = await this.request('auth/register',data,'post');
    return res;
  }

//   login route 
   static async login(data){
    let res = await this.request('auth/token',data,'post');
    return res;
   }

// get user

   static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
   }

// update user

   static async updateUser(username,data){
    let res = await this.request(`users/${username}`,data,'patch')
    return res
   }

   // apply for a job
   static async applyForJob(username,jobId){
    await this.request(`users/${username}/jobs/${jobId}`,{},'post');
    return {Applied:jobId}
   }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies list */

  static async getCompanies() {
    let res = await this.request('companies');
    console.log(JoblyApi.token)
    return res.companies;
    
  }

  /** Create a company */

  static async postCompany(data) {
    let res = await this.request('companies', data, "post");
    return res.company;
  }

  /** Update/Patch a company */

  static async updateCompany(handle,data) {
    let res = await this.request(`companies/${handle}`,data, 'patch');
    return res.company;
  }

  /** Get a job */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get jobs list */

  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  /** Create a job */

  static async postJob(data){
    let res = await this.request('jobs', data, "post");
    return res.job;
  }

  /** Update a job */

  static async patchJob(id,data){
    let res = await this.request(`jobs/${id}`,data,"patch");
    return res.job;
  }



  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

JoblyApi.token = window.localStorage.getItem('token') ;


export default  JoblyApi;