import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Context from "../components/Context"
export default function User() {
  const { email } = useParams()
  const [user, setUser] = useState()
  const context = useContext(Context)
  const APIURL = process.env.APIURL || "http://localhost:4000"

  useEffect(() => {
    fetch(APIURL + "/users/" + email, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: context.loggedUser.token,
      },
    })
      .then((json) => json.json())
      .then((data) => setUser(data[0]))
  }, [])
  return (
    <div className="User">
      {user && context.loggedUser.email ? (
        <div>
          <h3>{email} </h3>
          <h6>
            Registration Date:
            {new Date(user.registrationDate).toLocaleString()}
          </h6>
          <h6>Login Count: {user.loginCount}</h6>
          <h6>IP: {user.ip}</h6>
          <h6>User Agent: {user.userAgent}</h6>
          <h6>Last Login: {new Date(user.lastUpdate).toLocaleString()}</h6>
        </div>
      ) : (
        "Loading.. If you are not logged in, please do"
      )}
    </div>
  )
}
