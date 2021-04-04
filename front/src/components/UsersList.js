import React, { useEffect, useState, useContext } from "react"
import Context from "./Context"
import { useHistory } from "react-router-dom"
require("dotenv").config()

export default function UsersList() {
  const context = useContext(Context)
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const APIURL = process.env.REACT_APP_APIURL || "http://localhost:4000"
  const history = useHistory()

  useEffect(() => {
    //CHECKS IF THE USER IS LOGGED IN AND IF DATA WASN'T FETCHED/EMPTY
    if (context.loggedUser.email && users.length == 0)
      //FETCHING THE USERS FROM THE BACKEND, ALSO PASSING THE JWT AUTH TOKEN
      fetch(APIURL + "/users", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: context.loggedUser.token,
        },
      })
        .then((json) => json.json())
        .then((data) => {
          //UPDATES THE STATE WITH THE USERS ARRAY
          setUsers(data)
          // 5 SEC TIMER TO RE-RENDER THE COMPONENT AND TO FETCH DTHE DATA AGAIN BY EMPTYING THE USERS ARRAY
          setTimeout(() => setUsers([]), 10000)
          return function cleanup() {
            setUsers([])
          }
        })
        .catch((err) =>
          setError("Error fetching users from APIURL ", process.env.APIURL)
        )
    //TRIGERRING RE-RENDERING OF THE COMPONENT ON EVERY CHANGE IF THE USERS ARRAY IN THE STATE
  }, [users])
  return (
    <div className="UsersList">
      {context.loggedUser.email ? (
        <h2 className="pageTitle">
          <b>Logged Users List</b>
        </h2>
      ) : (
        <h3>Please login first, in order to view users list</h3>
      )}

      {users.map((user) => {
        if (user.loggedIn)
          return (
            <div key={user.registrationDate} className="user">
              <h4 onClick={(e) => history.push("/user/" + user.email)}>
                {user.email}
                <span>
                  Last login: {new Date(user.lastUpdate).toLocaleString()}, IP:{" "}
                  {user.ip ? user.ip : "Not found"} <br />
                </span>
              </h4>
              <br />
            </div>
          )
        else return <h1>Not authorized</h1>
      })}
      {error}
      <br />
    </div>
  )
}
