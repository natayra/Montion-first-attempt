import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_white.png";
import check from "../../assets/check.jpg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      email: "",
      username: "",
      code: "",
      password: "",
      password_repeat: "",
      first_name: "",
      last_name: "",
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.currentTarget.value,
    });
  };
  handleCodeChange = (e) => {
    this.setState({
      code: e.currentTarget.value,
    });
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.currentTarget.value,
    });
  };
  handleFirstNameChange = (e) => {
    this.setState({
      first_name: e.currentTarget.value,
    });
  };
  handleLastNameChange = (e) => {
    this.setState({
      last_name: e.currentTarget.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };
  handlePasswordRepeatChange = (e) => {
    this.setState({
      password_repeat: e.currentTarget.value,
    });
  };

  handleRegister = async (e) => {
    e.preventDefault();
    const urlRegister =
      "https://motion.propulsion-home.ch/backend/api/auth/registration/";
    const configRegister = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
      }),
    };

    const response = await fetch(urlRegister, configRegister);
    if (!response.ok) {
      alert("Please insert an email");
    } else {
      this.setState({
        clicked: "first-click",
      });
    }
  };

  handleContinue = (e) => {
    e.preventDefault();
    this.setState({
      clicked: "second-click",
    });
  };

  handleValidation = async (e) => {
    const urlValidation =
      "https://motion.propulsion-home.ch/backend/api/auth/registration/validation/";
    const configValidation = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        code: this.state.code,
        password: this.state.password,
        password_repeat: this.state.password_repeat,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      }),
    };
    const response = await fetch(urlValidation, configValidation);
    if (!response.ok) {
      alert("Please fill all the fields");
    } else {
      this.props.history.push("./login");
    }
  };

  render() {
    if (this.state.clicked === "first-click") {
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
                <input
                  type="button"
                  className="bottom-login-section facebook"
                />
                <input
                  type="button"
                  className="bottom-login-section instagram"
                />
              </div>
              <span className="rights">
                © Motion 2018. All rights reserved.
              </span>
            </div>
          </div>
          <div className="right-side" id="congratulations">
            <h2>Congratulations!</h2>
            <img id="check" src={check} alt=""></img>
            <h2 id="sent-email">
              We've sent a confirmation code to your email {this.state.email}
            </h2>
            <button id="continue-button" onClick={this.handleContinue}>
              CONTINUE
            </button>
          </div>
        </start>
      );
    } else if (this.state.clicked === "second-click") {
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
                <input
                  type="button"
                  className="bottom-login-section facebook"
                />
                <input
                  type="button"
                  className="bottom-login-section instagram"
                />
              </div>
              <span className="rights">
                © Motion 2018. All rights reserved.
              </span>
            </div>
          </div>
          <div class="right-side">
            <form id="form-validation">
              <h1 class="sign-in-text">Verification</h1>
              <div id="validation">
                <input
                  onChange={this.handleCodeChange}
                  value={this.state.code}
                  type="text"
                  className="inputs"
                  placeholder="Validation Code"
                  required
                ></input>
                <input
                  value={this.state.email}
                  type="email"
                  className="inputs"
                  placeholder="Email"
                  readOnly
                ></input>
                <input
                  onChange={this.handleUsernameChange}
                  value={this.state.username}
                  type="text"
                  className="inputs"
                  placeholder="Username"
                  required
                ></input>
                <input
                  onChange={this.handleFirstNameChange}
                  value={this.state.first_name}
                  type="text"
                  className="inputs"
                  placeholder="First Name"
                ></input>
                <input
                  onChange={this.handleLastNameChange}
                  value={this.state.last_name}
                  type="text"
                  className="inputs"
                  placeholder="Last Name"
                ></input>
                <input
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  type="password"
                  className="inputs"
                  placeholder="Password"
                  required
                ></input>
                <input
                  onChange={this.handlePasswordRepeatChange}
                  value={this.state.password_repeat}
                  type="password"
                  placeholder="Password repeat"
                  className="inputs"
                  required
                ></input>
                <button id="continue-button">COMPLETE</button>
              </div>
            </form>
          </div>
        </start>
      );
    } else {
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
                <input
                  type="button"
                  className="bottom-login-section facebook"
                />
                <input
                  type="button"
                  className="bottom-login-section instagram"
                />
              </div>
              <span className="rights">
                © Motion 2018. All rights reserved.
              </span>
            </div>
          </div>
          <div class="right-side">
            <div class="upper-right">
              <div id="no-account">Already have an account?</div>
              <Link to="/login">
                <button id="sign-up-button">SIGN IN</button>
              </Link>
            </div>
            <div class="bottom-right">
              <h1 class="sign-in-text">Sign up</h1>
              <form id="register-form">
                <input
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                  type="email"
                  placeholder="Email"
                  className="inputs"
                ></input>
                <button id="continue-button" onClick={this.handleRegister}>
                  CONTINUE
                </button>
              </form>
            </div>
          </div>
        </start>
      );
    }
  }
}

export default Register;
