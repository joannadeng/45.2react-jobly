import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import HomePage from './HomePage';              
import LoginForm from './LoginForm';
import SignupForm from './SIgnupForm';
import Companies from './Companies';
import Jobs from './Jobs';
import CompanyDetail from './CompanyDetail';
import CurrentUserContext from './CurrentUserContext';
import JoblyApi from './JoblyAPI';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import useLocalStorageState from './useLocalStorageState';
import ProfileForm from './ProfileForm';


function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useLocalStorageState("token",'');
  
  async function login (data) {
    let res = await JoblyApi.login(data); //return token
    // const value = JSON.stringify(res.token);
    setToken(res.token);
  }

  async function signup(data) {
    let res = await JoblyApi.signup(data); 
    // const value = JSON.stringify(res.token);
    setToken(res.token);
  }

  useEffect(() => {
    async function getCurrentUser() {
      if(token){
      let user = jwtDecode(token);
      try{
        let res = await JoblyApi.getUser(user.username)
        setCurrentUser(res);
        console.log(res)
      }catch(e){
        console.log(e)
      }
      };
    };
    getCurrentUser();
  },[token])


  function logout() {
    // window.localStorage.removeItem('token');
    setToken('');
    setCurrentUser('');
  }

  return (
    <div className="App" >
      <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <NavBar logout={logout}/>
        <main>
        <Routes>
          <Route path = '/' element={<HomePage />}></Route>
          <Route 
          path = '/login' 
          element={<LoginForm 
          login={login} 
          />}></Route>
          <Route path = '/signup' element={<SignupForm signup={signup}/>}></Route>
          <Route path = '/companies' element={<Companies />}></Route>
          <Route path = '/companies/:handle' element={<CompanyDetail />}></Route>
          <Route path = '/jobs' element={<Jobs />}></Route>
          <Route path = '/profile' element={<ProfileForm setCurrentUser={setCurrentUser} />}></Route>
        </Routes>
        </main>
      </CurrentUserContext.Provider>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
