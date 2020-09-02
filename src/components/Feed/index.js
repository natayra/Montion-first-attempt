import React from "react";
import Posts from "../Posts";
import LikesList from "../LikesList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsArr: [],
      showID: null,
      editPostContent: true,
      content: "",
    };
  }

  componentDidMount = async () => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlFeed =
        "https://motion.propulsion-home.ch/backend/api/social/posts/following/";
      const urlMyPosts =
        "https://motion.propulsion-home.ch/backend/api/social/posts/user/" +
        localStorage.id +
        "/";
      const configFeed = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };
      const configMyPosts = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };

      let postsArrFetchs = [];
      const response = await fetch(urlMyPosts, configMyPosts);
      if (!response.ok) {
        alert("Error my posts");
      } else {
        const myposts = await response.json();
        for (let i = 0; i < myposts.length; i++) {
          postsArrFetchs.push(myposts[i]);
        }
      }
      if (!response.ok) {
        alert("Error following posts");
      } else {
        const res = await fetch(urlFeed, configFeed);
        const posts = await res.json();
        for (let i = 0; i < posts.length; i++) {
          postsArrFetchs.push(posts[i]);
        }
      }

      this.setState({
        postsArr: postsArrFetchs,
      });

      LikesList();
    }
  };
  handleLike = async (postID) => {
    const urlLikePost =
      "https://motion.propulsion-home.ch/backend/api/social/posts/toggle-like/" +
      postID +
      "/";
    const configLikePost = {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.token,
      }),
    };
    await fetch(urlLikePost, configLikePost);
    window.location.reload();
  };

  handleDeletePost = async (postID) => {
    const urlDeletePost =
      "https://motion.propulsion-home.ch/backend/api/social/posts/" +
      postID +
      "/";

    const configDeletePost = {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.token,
      }),
    };

    const res = fetch(urlDeletePost, configDeletePost)
    if (!res.ok) {
      alert("Wasn't possible to delete account")
    }
    else {
    window.location.reload();
    }
  };

  months = (n) => {
    if (n === "01") {
      return "January";
    } else if (n === "02") {
      return "February";
    } else if (n === "03") {
      return "March";
    } else if (n === "04") {
      return "April";
    } else if (n === "05") {
      return "May";
    } else if (n === "06") {
      return "June";
    } else if (n === "07") {
      return "July";
    } else if (n === "08") {
      return "August";
    } else if (n === "09") {
      return "September";
    } else if (n === "10") {
      return "October";
    } else if (n === "11") {
      return "November";
    } else if (n === "12") {
      return "December";
    }
  };

  handleClose = () => this.setState({ showID: null });
  handlePopPost = (id) => this.setState({ showID: id });

  render() {
    return (
      <div id="feed-all">
        <div id="feed-body">
          <input className="search-feed" placeholder="Search posts..."></input>

          <div className="search-feed-right">
            <button id="liked">Liked</button>
            <button id="friends">Friends</button>
            <button id="follow">Follow</button>
          </div>
        </div>
        <div id="feed">
          <Posts />
          {this.state.postsArr.map((post) => (
            <div className="posts-feed" id={post.id}>
              <div className="name-date">
                <img
                  alt=""
                  src={post.user.avatar}
                  className="avatar avatar-feed"
                ></img>
                <div id="post-name-date">
                  <div>
                    {post.user.first_name} {post.user.last_name}
                  </div>
                  <div className="post-date">
                    {this.months(post.created.substring(5, 7))}{", "}
                    {post.created.substring(8, 10)}{" "}
                    {post.created.substring(11, 16)}
                  </div>
                </div>
              </div>
              <Button
                id="post-content-button"
                variant="primary"
                onClick={() => this.handlePopPost(post.id)}
              >
                <div>{post.content}</div>
              </Button>
              <div className="footer">
                <div className="likes-shares">
                  <button
                    className="like-button"
                    id={"like" + post.id}
                    hidden={
                      post.user.id === parseInt(localStorage.id) ? true : false
                    }
                    onClick={() => {
                      this.handleLike(post.id);
                    }}
                  ></button>
                  <button className="share-button" id={"share" + post.id}>
                    Share
                  </button>
                </div>
                <div>{post.amount_of_likes} Likes</div>
              </div>
              <Modal
                size="lg"
                id="modal-container"
                centered={true}
                animation={true}
                show={this.state.showID === post.id ? true : false}
                onHide={this.handleClose}
              >
                <Modal.Body id="modal">
                  <div className="posts-feed-modal" id={post.id}>
                    <div>
                      <div className="name-date">
                        <div id={post.id}>
                          <img
                            alt=""
                            src={post.user.avatar}
                            className="avatar avatar-feed"
                          ></img>
                          <div id="post-name-date">
                            {post.user.first_name} {post.user.last_name}
                            <div className="post-date">
                              {this.months(post.created.substring(5, 7))}{" "}
                              {post.created.substring(8, 10)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>{post.content}</div>

                      <div className="footer">
                        <button
                          id={"like" + post.id}
                          hidden={
                            post.user.id === parseInt(localStorage.id)
                              ? true
                              : false
                          }
                          onClick={() => {
                            this.handleLike(post.id);
                          }}
                        ></button>
                        <button className="share-button" id={"share" + post.id}>
                          Share
                        </button>
                        <div>{post.amount_of_likes} Likes</div>
                      </div>
                      <div className="container-user-and-menu">
                        <div id="profile-and-logout">
                          <DropdownButton
                            id="dropdown-button-profile"
                            hidden={
                              post.user.id === parseInt(localStorage.id)
                                ? false
                                : true
                            }
                            drop="down"
                            title=""
                          >
                            <Dropdown
                              id={"edit-" + post.id}
                              hidden={
                                post.user.id === parseInt(localStorage.id)
                                  ? false
                                  : true
                              }
                            >
                              Edit
                            </Dropdown>
                            <Dropdown
                              id={"delete-" + post.id}
                              hidden={
                                post.user.id === parseInt(localStorage.id)
                                  ? false
                                  : true
                              }
                              onClick={() => this.handleDeletePost(post.id)}
                            >
                              Delete
                            </Dropdown>
                          </DropdownButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
