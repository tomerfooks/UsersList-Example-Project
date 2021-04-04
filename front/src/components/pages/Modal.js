import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
//SIMPLE ANIMATION TO MAKE THE MODAL LOOK BETTER
import { Animate } from "react-simple-animate"
import Context from "../Context"
//IMPORTS THE DIFFERENT COMPONENTS THAT MAY DISPLAY IN THE MODAL
import Login from "./Login"
import Signup from "./Signup"
import User from "../User"

export default function Modal(props) {
  const context = useContext(Context)
  //GETS THE MODAL TYPE AND TITLE FROM THE PROPS
  const { type, title } = props.props
  const history = useHistory()
  //STATE FOR OPENING AND CLOSING THE MODAL
  const [toggleModal, setToggleModal] = useState(true)
  return (
    <div>
      {toggleModal ? (
        <div className="modal">
          <Animate
            play={true}
            end={{ marginTop: "0px", opacity: 1 }}
            start={{ marginTop: "100px", opacity: 0 }}>
            <div className="wrapper">
              <div
                onClick={() => {
                  setToggleModal(false)
                  if (type === "User") history.push("/Users")
                  else history.push("/")
                }}
                className="close">
                x
              </div>
              <h3>{title}</h3>
              {type === "Login" ? <Login /> : null}
              {type === "Signup" ? <Signup /> : null}
              {type === "User" ? <User /> : null}
            </div>
          </Animate>
        </div>
      ) : null}
    </div>
  )
}
