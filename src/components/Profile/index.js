import React from "react";
import { Link } from "react-router-dom";
import Feed from "../Feed";
import MyFriends from "../MyFriends";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileArr: [],
      hiddeFeed: true,
      hiddeFriends: true,
    };
  }

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
        alert("Error");
      } else {
        const myData = await res.json();
        this.setState({
          profileArr: myData,
        });
      }
    }
  };

  handleClickPosts = () => this.setState({ hiddeFeed: false });
  handleClickFriends = () => this.setState({ hiddeFriends: false });

  render() {
    return (
      <div className="profile-container">
        <div className="profile">
          <div className="bla">
            <div className="left-profile">
              <img
                className="avatar"
                src={this.state.profileArr.avatar}
                alt=""
              ></img>
              <div className="name-location">
                <div>
                  {this.state.profileArr.first_name}{" "}
                  {this.state.profileArr.last_name}
                </div>
                <div id="locatio-profile">{this.state.profileArr.location}</div>
              </div>
              <Link to="./profileedit">
                <button id="edit-profile">EDIT PROFILE</button>
              </Link>
            </div>
            <div className="right-profile">
              <div className="top-rigth-profile">
                <div>
                  About
                  <div>{this.state.profileArr.about_me}</div>
                </div>
                <div>
                  Things I like
                  <div>
                    {this.state.profileArr.things_user_likes !== undefined
                      ? this.state.profileArr.things_user_likes.map(
                          (thing) => thing
                        )
                      : null}
                  </div>
                </div>

                <div className="email">
                  <div>Email</div>
                  <div>{this.state.profileArr.email}</div>
                </div>
              </div>

              <div className="info-profile">
                <button
                  className="button-profile"
                  onClick={this.handleClickPosts}
                >
                  {this.state.profileArr.amount_of_posts} Posts
                </button>
                <button
                  className="button-profile"
                  onClick={this.handleClickPosts}
                >
                  {this.state.profileArr.amount_of_likes} Likes
                </button>
                <button
                  className="button-profile"
                  onClick={this.handleClickFriends}
                >
                  {this.state.profileArr.amount_of_friends} Friends
                </button>
                <button className="button-profile">
                  {this.state.profileArr.amount_of_followers} Followers
                </button>
                <button className="button-profile">
                  {this.state.profileArr.amount_following} Following
                </button>
              </div>
            </div>
          </div>
        </div>
        <div hidden={this.state.hiddeFeed}>
          <Feed />
        </div>
        <div hidden={this.state.hiddeFriends}>
          <MyFriends />
        </div>
      </div>
    );
  }
}
export default Profile;
