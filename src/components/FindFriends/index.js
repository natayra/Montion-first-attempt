import React from "react";

class FindFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArr: [],
      follow: "FOLLOW",
      add_friend: "ADD FRIEND",
    };
  }

  componentDidMount = async () => {
    // get all the users

    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlUsers = "https://motion.propulsion-home.ch/backend/api/users/";

      const configUsers = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };
      const res = await fetch(urlUsers, configUsers);
      if (!res.ok) {
        alert("Error fetch users");
      } else {
        const users = await res.json();
        this.setState({
          usersArr: users,
        });

        // Get users that i'm following

        const urlFollowing =
          "https://motion.propulsion-home.ch/backend/api/social/followers/following/";
        const configFollowing = {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + localStorage.token,
          }),
        };
        const resp = await fetch(urlFollowing, configFollowing);
        if (!resp.ok) {
          alert("Error fetch follow");
        } else {
          const following = await resp.json();
          following.forEach((user) => {
            document.getElementById("follow" + user.id).innerText = "FOLLOWING";
          })
        }
    
      }
      const urlRequests =
      "https://motion.propulsion-home.ch/backend/api/social/friends/requests/";
    const configRequests = {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.token,
      }),
    };
     const rsp = await fetch(urlRequests, configRequests);
     if (!rsp.ok) {
       alert("Error fetch friends");
     } else {
       const friendship = await rsp.json();
       friendship.map((request) => {
         if (request.requester.id === localStorage.id) {
           document.getElementById("add" + request.receiver.id).innerText =
             "Request sent";
         }
       });
     }
    }
  };

  handleFollow = async (id) => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlFollowFriend =
        "https://motion.propulsion-home.ch/backend/api/social/followers/toggle-follow/" +
        id +
        "/";
      const configFollowFriend = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        }),
      };

      const response = await fetch(urlFollowFriend, configFollowFriend);
      if (!response.ok) {
        alert("Can't follow");
      } else {
        window.location.reload();
      }
    }
  };

  handleAddFriend = async (id) => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlFriendsRequests =
        "https://motion.propulsion-home.ch/backend/api/social/friends/request/" +
        id +
        "/";
      const configAddFriend = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        }),
      };

      const response = await fetch(urlFriendsRequests, configAddFriend);
      if (!response.ok) {
        alert("Can't add");
      } else {
        window.location.reload();
      }
    }
  };

  render() {
    return (
      <div id="out">
        <div id="find-friends">
          {this.state.usersArr.map((user) =>
            user.first_name !== "" &&
            user.first_name !== "test" &&
            user.last_name !== "test" ? (
              <div className="out" id={user.id}>
                <div>
                  {user.avatar !== null ? (
                    <img src={user.avatar} className="avatar" alt=""></img>
                  ) : (
                    <img
                      src="https://www.bebuzee.com/users/main/no_image_image_news.jpg"
                      className="avatar"
                      alt=""
                    ></img>
                  )}
                </div>
                <div>
                  {user.first_name} {user.last_name}
                </div>
                <div>{user.location !== null ? user.location : " "}</div>
                <div id="follow-addfriend-buttons">
                  <button
                    id={"follow" + user.id}
                    onClick={() => this.handleFollow(user.id)}
                  >
                    FOLLOW
                  </button>
                  <button
                    id={"add" + user.id}
                    onClick={() => this.handleAddFriend(user.id)}
                  >
                    ADD FRIEND
                  </button>
                </div>

                <div>{user.about_me !== null ? user.about_me : " "}</div>
                <div id="things-like">
                  {user.things_user_likes !== null
                    ? user.things_user_likes.map((thing) => (
                        <button>{thing}</button>
                      ))
                    : " "}{" "}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
}
export default FindFriends;
