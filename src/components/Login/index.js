import React from "react";
import logo from "../../assets/logo_white.png";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: undefined,
      accessToken: "",
      refreshToken: "",
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.currentTarget.value,
    });
  };

  handlePassChange = (e) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const urlLogin =
      "https://motion.propulsion-home.ch/backend/api/auth/token/";
    const configLogin = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    const response = await fetch(urlLogin, configLogin);
    if (!response.ok) {
      alert("Please login or create an account to start");
    } else {
      const data = await response.json();
      this.setState({
        user: data,
        accessToken: data.access,
        refreshToken: data.refresh,
      });
      localStorage.setItem("token", this.state.accessToken);
      localStorage.setItem("id", this.state.user.user.id);
      this.props.history.push("./feed");
    }
  };

  render() {
    return (
      <start>
        <div className="left-side">
          <div className="upper-left">
            <div className="upper-login-section">
              <div className="logo">
                <img
                  id="motion-logo"
                  src={logo}
                  alt="motion-logo"
                  width="80px"
                ></img>
                <h2 id="motion-word">Motion</h2>
              </div>
              <div className="motion-text">
                <p>Connect with friends and the world</p>
                <p>around you with Motion.</p>
              </div>
              <div>
                <input type="button" className="app-buttons buttonApple" />
                <input type="button" className="app-buttons buttonGoogle" />
              </div>
            </div>
          </div>
          <div className="down-left">
            <div className="bottom-login-section">
              <input type="button" className="bottom-login-section twitter" />
              <input type="button" className="bottom-login-section facebook" />
              <input type="button" className="bottom-login-section instagram" />
            </div>
            <span className="rights">© Motion 2018. All rights reserved.</span>
          </div>
        </div>
        <div className="right-side">
          <div className="upper-right">
            <div id="no-account">Don't have an account?</div>
            <Link to="/register">
              <button id="sign-up-button">SIGN UP</button>
            </Link>
          </div>
          <div className="bottom-right">
            <h1 className="sign-in-text">Sign in</h1>
            <form id="form-login">
              <input
                id="username"
                onChange={this.handleEmailChange}
                value={this.state.email}
                type="email"
                placeholder="Username"
                className="inputs"
              ></input>
              <input
                id="password"
                onChange={this.handlePassChange}
                value={this.state.password}
                type="password"
                placeholder="Password"
                className="inputs"
              ></input>
              <button id="sign-in-button" onClick={this.handleLogin}>
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </start>
    );
  }
}

export default Login;
