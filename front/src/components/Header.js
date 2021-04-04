import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Context from "./Context"
import logoutUser from "../utils/logoutUser.js"

export default function Header() {
  const context = useContext(Context)

  const logout = () => {
    logoutUser(context.loggedUser.email, context.loggedUser.token)
    context.updateLoggedUser({})
  }
  useEffect(() => {}, [context.loggedUser])
  return (
    <div className="header">
      <div className="logo">
        <img
          style={{ width: "60px" }}
          src="http://localhost:3000/images/logo.png"
        />
      </div>
      <div className="topBar">
        <Link to="/Signup"></Link>
      </div>
      <div className="menu">
        {!context.loggedUser.email ? (
          <div className="item">
            <Link to="/Login">Login</Link>
          </div>
        ) : null}
        {!context.loggedUser.email ? (
          <div className="item">
            <Link to="/Signup">Sign Up</Link>
          </div>
        ) : null}
        {context.loggedUser.email ? (
          <div onClick={logout} className="item">
            <Link to="/">Logout</Link>
          </div>
        ) : null}

        {context.loggedUser.email ? (
          <div className={"item " + (context.loggedUser.email ? "logged" : "")}>
            <Link to="/">Logged in as {context.loggedUser.email}</Link>
          </div>
        ) : null}
        {context.loggedUser.email ? (
          <div className={"item " + (context.loggedUser.email ? "logged" : "")}>
            <Link to="/Users">Users List</Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
