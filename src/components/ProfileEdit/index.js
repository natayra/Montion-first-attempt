import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileArr: [],
      email: "",
      first_name: "",
      last_name: "",
      username: "",
      avatar: null,
      banner: null,
      location: "",
      about_me: "",
      things_user_likes: [],
      show: false,
    };
  }

  handleChangeFirstName = (e) => {
    this.setState({
      first_name: e.currentTarget.value,
    });
  };
  handleChangeLastName = (e) => {
    this.setState({
      last_name: e.currentTarget.value,
    });
  };
  handleChangeUsername = (e) => {
    this.setState({
      username: e.currentTarget.value,
    });
  };
  handleChangeLocation = (e) => {
    this.setState({
      location: e.currentTarget.value,
    });
  };
  handleChangeAboutMe = (e) => {
    this.setState({
      about_me: e.currentTarget.value,
    });
  };

  handleChangeThingsILike = (e) => {
    this.setState({
      things_user_likes: e.currentTarget.value,
    });
  };

  componentDidMount = async () => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlProfile =
        "https://motion.propulsion-home.ch/backend/api/users/me/";
      const configProfile = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };

      const res = await fetch(urlProfile, configProfile);
      if (!res.ok) {
        alert("Error1");
      } else {
        const myData = await res.json();
        this.setState({
          email: myData.email,
          first_name: myData.first_name,
          last_name: myData.last_name,
          username: myData.username,
          avatar: myData.avatar,
          banner: myData.banner,
          location: myData.location,
          about_me: myData.about_me,
          things_user_likes: myData.things_user_likes,
        });
      }
    }
  };

  handleNewProfile = async () => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlProfileEdit =
        "https://motion.propulsion-home.ch/backend/api/users/me/";
      const configProfileEdit = {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        }),
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          location: this.state.location,
          about_me: this.state.about_me,
        }),
      };

      await fetch(urlProfileEdit, configProfileEdit);
      this.props.history.push("./profile");
    }
  };

  handleClose = () => this.setState({ show: false });
  handleDeleteAccount = () => this.setState({ show: true });
  handleRealDelete = async () => {
    const urlDeleteAccount =
      "https://motion.propulsion-home.ch/backend/api/users/me/";
    const configDeleteAccount = {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.token,
      }),
    };
    await fetch(urlDeleteAccount, configDeleteAccount);
    localStorage.clear();
    this.props.history.push("./login");
  };

  render() {
    return (
      <div id="profile-edit">
        <div className="profile" id="profile-edi">
          <div className="bla">
            <div className="left-profile">
              <div>
                <img className="avatar" src={this.state.avatar} alt=" "></img>
              </div>
              <div>
                <Button
                  className="save-button"
                  id="dele"
                  variant="primary"
                  onClick={this.handleDeleteAccount}
                >
                  DELETE ACCOUNT
                </Button>
              </div>
              <Modal
                centered={true}
                animation={true}
                id="modal"
                show={this.state.show}
                onHide={this.handleClose}
              >
                <Modal.Body>
                  Are you sure you want to delete your account?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" id="delete-account" onClick={this.handleRealDelete}>
                    DELETE ACCOUNT
                  </Button>
                  <Button variant="secondary" id="close-delete" onClick={this.handleClose}>
                    CLOSE
                  </Button>
                </Modal.Footer>
              </Modal>
              <button onClick={this.handleNewProfile} className="save-button">
                SAVE
              </button>
            </div>
            <div className="right-profile">
              <form>
                <div className="top-rigth-profile">
                  <input
                    onChange={this.handleChangeFirstName}
                    value={this.state.first_name}
                    type="text"
                    placeholder="First Name"
                  ></input>
                  <input
                    onChange={this.handleChangeLastName}
                    value={this.state.last_name}
                    type="text"
                    placeholder="Last Name"
                  ></input>
                  <input placeholder={this.state.email} readOnly></input>
                  <input
                    onChange={this.handleChangeUsername}
                    value={this.state.username}
                    type="text"
                    placeholder="Username"
                    required
                  ></input>
                  <input
                    onChange={this.handleChangeLocation}
                    value={this.state.location}
                    type="text"
                    placeholder="Location"
                  ></input>
                  <input
                    onChange={this.handleChangeAboutMe}
                    value={this.state.about_me}
                    type="text"
                    placeholder="About"
                  ></input>
                  <div placeholder="Password">ppppp</div>
                </div>

                <div className="things-i-like">
                  Things I like
                  <div>{this.state.things_user_likes}</div>
                  <input
                    onChange={this.handleChangeThingsILike}
                    value={this.state.things_user_likes[0]}
                    type="text"
                    placeholder="Type Something"
                  ></input>
                  <button id="add-but">ADD</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
