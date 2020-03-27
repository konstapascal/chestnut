import React from "react";
import SignIn from "./login.svg";
import "./style.scss";

export class Login extends React.Component {

  render() {
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={SignIn} alt="login"/>
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="Password" placeholder="password" />
            </div>
          </div>
        </div>
        <footer className="footer">
          <button type="button" className="btn">
            Login
          </button>
        </footer>
      </div>
    );
  }
}
