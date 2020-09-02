import React from "react";

class App extends React.Component {
  render() {
    return (
    <>
    {localStorage.token !== undefined ? this.props.history.push("./feed") : this.props.history.push("./login")}
    </>
    );
  }
}
export default App;
