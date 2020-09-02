import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: [],
      received: [],
      requestsSent: [],
      requestsReceived: [],
    };
  }

  componentDidMount = async () => {
    if (localStorage.token === undefined) {
      this.props.history.push("./login");
    } else {
      const urlRequests =
        "https://motion.propulsion-home.ch/backend/api/social/friends/requests/";
      const configRequests = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.token,
        }),
      };

      const response = await fetch(urlRequests, configRequests);
      if (!response.ok) {
        alert("Error getting notifications");
      } else {
        let requestsSent = [];
        let requestsReceived = [];
        const myrequests = await response.json();
        myrequests.map((request) => {
          if (request.requester.id === localStorage.id) {
            requestsReceived.push(request);
          } else {
            requestsSent.push(request);
          }
        });
        this.setState({
          requestsSent: requestsSent,
          requestsReceived: requestsReceived,
        });
      }
    }
  };

  render() {

    console.log(this.state.requestsSent)


    return (
      <DropdownButton drop="down" id="dropdown-notifications">
       <div> Received Requests
        {this.state.requestsReceived.map((request) => (
          <Dropdown.Item id="requests">{request.requester.first_name}{" "}{request.requester.last_name}</Dropdown.Item>
        ))}
        </div>
        <div>
      Pendent Requests
        {this.state.requestsSent.map((request) => (
          <Dropdown.Item id="requests">{request.receiver.first_name}{" "}{request.receiver.last_name}</Dropdown.Item>
        ))}
        </div>
      </DropdownButton>
    );
  }
}

export default Notifications;
