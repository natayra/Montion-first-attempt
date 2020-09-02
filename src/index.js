import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import App from "./components/App";
import Register from "./components/Register";
import Feed from "./components/Feed";
import MyFriends from "./components/MyFriends";
import FindFriends from "./components/FindFriends";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import Layout from "./components/Layout";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Layout>
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/myfriends" component={MyFriends} />
            <Route exact path="/findfriends" component={FindFriends} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profileedit" component={ProfileEdit} />
          </Layout>
        </Switch>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
