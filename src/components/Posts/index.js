import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import send_button from "../../assets/send_button.svg";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleCreatePost = (e) => {
    this.setState({
      content: e.currentTarget.value,
    });
  };
  handlePost = async (e) => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      e.preventDefault();
      const urlCreatePost =
        "https://motion.propulsion-home.ch/backend/api/social/posts/";
      const configCreatePost = {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token,
        }),
        body: JSON.stringify({
          content: this.state.content,
        }),
      };

      const response = await fetch(urlCreatePost, configCreatePost);
      if (!response.ok) {
        alert("Please write something");
      } else {
        await response.json();
        window.location.reload();
      }
    }
  };
  handleClose = () => this.setState({ show: false });
  handlePopPost = () => this.setState({ show: true });

  render() {
    return (
      <div id="newposts">
        <Button
          id="button-new-post"
          variant="primary"
          onClick={this.handlePopPost}
        >
          <input
            className="input-new-post"
            onChange={this.handleCreatePost}
            value={this.state.newPost}
            type="text"
            placeholder="What's on your mind?"
          ></input>
          <button className="send">
            <img src={send_button} alt="" height="12px" width="12px"></img>
          </button>
        </Button>

        <Modal
          centered={true}
          animation={true}
          id="modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Body>
            <input
              className="input-new-post"
              onChange={this.handleCreatePost}
              value={this.state.newPost}
              type="text"
              placeholder="What's on your mind?"
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="send-popup-button"
              className="send"
              variant="primary"
              onClick={this.handlePost}
            >
              <img src={send_button} alt="" height="12px" width="12px"></img>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Posts;
