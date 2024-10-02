import React,{ useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem} from "reactstrap";
import CurrentUserContext from "./CurrentUserContext";

function NavBar({logout}) {
    const currentUser = useContext(CurrentUserContext);
    // const navigate = useNavigate();
    if(currentUser){
        return (
            <div>
            <Navbar>
                <NavLink to="/">
                    Jobly
                </NavLink>

                <Nav>
                    <NavItem>
                        <NavLink to="/companies">Companies  </NavLink>
                        <NavLink to="/jobs">Jobs  </NavLink>
                        <NavLink to="/profile">Profile  </NavLink>  
                        <NavLink to="/" onClick={logout}>LogOut {currentUser.username}  </NavLink> 
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
        )
    }
    return (
        <div>
            <Navbar>
                <NavLink to="/">
                    Jobly
                </NavLink>

                <Nav>
                    <NavItem>
                        <NavLink to="/login">Login </NavLink>
                        <NavLink to="/signup">SignUp</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;