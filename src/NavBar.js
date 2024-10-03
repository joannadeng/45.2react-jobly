import React,{ useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem} from "reactstrap";
import CurrentUserContext from "./CurrentUserContext";
import './NavBar.css'

function NavBar({logout}) {
    const currentUser = useContext(CurrentUserContext);
    if(currentUser){
        return (
        <div className="NavBar">
            <div className="NavBar-Jobly">
               <Navbar >
                <NavLink  to="/">Jobly</NavLink>
               </Navbar> 
            </div>
            
            <div className="link-right">
                <Navbar >
                  {/* <Nav > */}
                    <ul>
                        <li><NavLink to="companies">Companies</NavLink></li>
                        <li><NavLink to="jobs">Jobs</NavLink></li>
                        <li><NavLink to="profile">Profile</NavLink></li>
                        <li><NavLink to="/" onClick={logout}>LogOut {currentUser.username}</NavLink></li>
                    </ul>
                  {/* </Nav> */}
                </Navbar>
            </div>
        </div>
        )
    }
    return (
        <div>
            <div className="NavBar-Jobly">
                <Navbar >
                   <NavLink  to="/">Jobly</NavLink>
                </Navbar>
            </div>
            <div className="link-right">
              <Navbar >
                {/* <Nav > */}
                    <ul>
                        <li><NavLink to="/login"> Login  </NavLink></li>
                        <li><NavLink to="/signup"> SignUp </NavLink></li>
                    </ul>
                {/* </Nav> */}
              </Navbar>
            </div>
               
        </div>
    );
}

export default NavBar;