import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Context from "./components/Context"
import "./styles/App.scss"
import auth from "./utils/auth"
import Modal from "./components/pages/Modal"
import UsersList from "./components/UsersList"

require("dotenv").config()

function App() {
  const [loggedUser, setLoggedUser] = useState({})

  //THIS FUNCTION UPDATES THE LOGGED USER IN THE CONTEXT
  const updateLoggedUser = (freshlyLoggedUser) =>
    setLoggedUser(freshlyLoggedUser)

  useEffect(() => {
    //CHECKS IF NO USER IS LOGGED IN, THEN GETS THE USER FROM THE JWT TOKEN AND SETS IT IN THE STATE
    if (!loggedUser.token && auth()) setLoggedUser(auth())
    if (loggedUser.token) console.log("Logged In User ", loggedUser)
  }, [loggedUser])
  return (
    <div className="app">
      {/* CONTEXT FOR SHARING LOGGED IN USER INFORMATION BETWEEN COMPONENTS  */}
      <Context.Provider value={{ loggedUser, updateLoggedUser }}>
        <Context.Consumer>
          {() => (
            //BROWSER ROUTER FOR NAVGIATION BETWEEN ROUTES
            <Router>
              {/* HEADER CONTAINS LOGO AND MENU LINKS */}
              <Header />
              <Switch>
                {/* DISPLAY LIVE LOGGED USERS LIST */}
                <Route path="/Users">
                  <UsersList />
                </Route>
                {/* RETRIEVES SPECIFIC USER INFORMATION BY EMAIL */}
                <Route
                  path="/user/:email"
                  render={() => <Modal props={{ title: "", type: "User" }} />}
                />
                {/* USER LOGIN USING MODAL */}
                <Route
                  path="/Login"
                  render={() => (
                    <Modal props={{ title: "Login", type: "Login" }} />
                  )}
                />
                {/* NEW USER SIGNUP USING MODAL */}
                <Route
                  path="/Signup"
                  render={() => (
                    <Modal
                      props={{
                        title: "Signup to Elementor",
                        type: "Signup",
                      }}
                    />
                  )}
                />
                {/* HOMEPAGE WITH WELCOME MESSAGE */}
                <Route exact path="/">
                  <div className="texteffect">
                    <div className="shadows">
                      <span>E</span>
                      <span>L</span>
                      <span>E</span>
                      <span>M</span>
                      <span>E</span>
                      <span>N</span>
                      <span>T</span>
                      <span>O</span>
                      <span>R</span>
                    </div>
                  </div>
                </Route>
              </Switch>
              <Footer />
            </Router>
          )}
        </Context.Consumer>
      </Context.Provider>
    </div>
  )
}

export default App
