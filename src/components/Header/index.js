import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Notifications from '../Notifications'

class Header extends React.Component {
  handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
   
    return (
      
      <div className="container-top-1">
    
        <div className="container-top-1-left">
          <div id="container-motion">
            <img src={logo} alt="motion logo" id="logo-header"></img>
            <h3>Motion</h3>
          </div>
          <div className="container-posts-and-friends">
            <Link to="/feed">
              <div id="container-posts">
                <div height="18px" width="18px" alt=""></div>
                <h5>Posts</h5>
              </div>
            </Link>
            <Link to="/findfriends">
              <div id="container-friends">
                <div alt=""></div>
                <h5>Find Friends</h5>
              </div>
            </Link>
          </div>
        </div>
        <div className="container-top-1-right">
       < Notifications />
          <div className="container-user-and-menu">
            <div id="profile-and-logout">
              <DropdownButton drop="down" id="dropdown-button-profile" title="">
                <Link to="/profile">
                  <Dropdown eventKey="1" id="profile-tab">
                    Profile
                  </Dropdown>
                </Link>
                <Dropdown
                  eventKey="2"
                  id="logout-tab"
                  onClick={this.handleLogout}
                >
                  Logout
                </Dropdown>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
