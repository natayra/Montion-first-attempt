import React from "react";

class MyFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
    componentDidMount = () => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlFriends =
        "https://motion.propulsion-home.ch/backend/api/social/friends/";
      const configFriends = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };
      fetch(urlFriends, configFriends)
      .then((res) => res.json())
      .then((friends) => friends);
     
    }
  };

  render() {
    return (
      <>
        <div>No friends yet :(</div>
      </>
    );
  }
}

export default MyFriends;
