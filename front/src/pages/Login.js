import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import Context from "../Context"
import publicIp from "public-ip"

export default function Login() {
  //USING THE APP'S CONTEXT
  const context = useContext(Context)

  //STATES FOR BASIC USER INPUTS AND ERROR
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  const getClientIp = async () =>
    await publicIp.v4({
      fallbackUrls: ["https://ifconfig.co/ip"],
    })

  //REACT HOOK FOR NAVIGATION AND INTERACTING WITH THE BROWSER HISTORY
  const history = useHistory()

  const loginUser = async () => {
    const APIURL = process.env.REACT_APP_APIURL || "http://localhost:4000"
    //FETCHING DATA FROM THE API USING A HTTP POST REQUEST
    let ip = await getClientIp()
    fetch(APIURL + "/users/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass, ip }),
    })
      .then((json) => json.json())
      .then((data) => {
        if (data.err) return setError("Wrong password")
        //UPDATES THE LOGGED USER IN THE APP CONTEXT
        context.updateLoggedUser(data.reply)
        //NAVIGATION TO USERSLIST ROUTE
        history.push("/Users")
      })
  }

  return (
    <div className="login">
      <p>Please login using your email and password, or sign-up</p>
      <input
        id="email"
        value={email}
        placeholder={"Email Address"}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <input
        id="pass"
        value={pass}
        placeholder={"Password"}
        onChange={(e) => setPass(e.target.value)}
        type="password"
      />
      <button onClick={loginUser}>Login</button>
      <button
        className="signupButton"
        onClick={() => {
          history.push("/Signup")
        }}>
        Not a member yet? Sign-up
      </button>
      <br />
      <br />
      {error}
    </div>
  )
}
