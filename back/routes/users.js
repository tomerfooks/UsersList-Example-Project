const createUser = require("../db/createUser")
const loginUser = require("../db/loginUser")
const logoutUser = require("../db/logoutUser")
const auth = require("../utils/auth")

module.exports = (app, Users) => {
  //GET ALL LOGGED IN USERS FROM DB, ONLY FOR AUTHENTICATED USERS
  app.get("/users", (req, res) => {
    if (auth(req.headers))
      Users.find({ loggedIn: true })
        .toArray()
        .then((data) => res.send(data))
        .catch((err) => res.send(err))
    else return res.send("Not Authorized")
  })

  //GET USER BY EMAIL, ONLY FOR AUTHENTICATED USERS
  app.get("/users/:email", (req, res) => {
    if (auth(req.headers))
      if (req.params.email)
        Users.find({ email: req.params.email })
          .toArray()
          .then((data) => res.send(data))
          .catch((err) => res.send(err))
      else return res.send("Missing email..")
    else return res.send("Not authorized. sorry")
  })

  //REGISTERS NEW USER
  app.post("/users/create", (req, res) => {
    const { email, pass, ip } = req.body
    if (!email || !pass || !ip)
      return res.send("Missing required details for registration")

    createUser(email, pass, ip, Users, req)
      .then((newUser) => res.send(newUser))
      .catch((err) => res.send(err))
  })

  //LOGIN USER
  app.post("/users/login", (req, res) => {
    const { email, pass, ip } = req.body
    if (!email || !pass || !ip) return res.send("Missing information")
    else
      loginUser(email, pass, ip, Users, req)
        .then((reply) => res.send({ reply }))
        .catch((err) => res.send({ err }))
  })
  //LOGOUT USER BY EMAIL, ONLY FOR AUTHENTICATED USERS
  app.post("/users/logout/:email", (req, res) => {
    const { email } = req.params
    if (auth(req.headers) && email)
      logoutUser(email, Users)
        .then((reply) => res.send(reply))
        .catch((err) => res.send(err))
    else return res.send("Not authorized. sorry")
  })
}
