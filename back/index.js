//DOTENV FOR USING ENVIRONMENT VARIABLES
require("dotenv").config()
const app = require("express")()
const { MongoClient, ObjectId } = require("mongodb")

//BODYPARSER FOR JSON REQUESTS & CORS FOR USING CORS REQUESTS
app.use(require("cors")())
app.use(require("body-parser").json())

//SETTING REQURED HEADERS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
//WELCOME PAGE
app.get("/", (req, res) => res.send("Hello Elementor!"))

const server = async () => {
  //CREATES A USER CLIENT FOR INTERACTING WITH THE USERS COLLECTIONS IN THE MONGODB
  const Users = await MongoClient.connect(process.env.mongoUrl, {
    useUnifiedTopology: true,
  })
  //IMPORTS ROUTES and
  const UsersDB = Users.db("elementor").collection("users")
  require("./routes/users")(app, UsersDB)
}
//USING TRY AND CATCH TO CAPTURE ANY ERRORS..
try {
  server()
} catch (e) {
  console.log(e)
}
//RUNNING THE SERVER
app.listen(process.env.apiPort, () =>
  console.log("Server running on port ", process.env.apiPort)
)
