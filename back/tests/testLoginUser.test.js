//HTTPS FOR MAKING HTTP REQUESTS FROM EXPRESS
const https = require("https")
describe("User Login Test", () => {
  //THESE ARE THE ADMINISTRATOR
  const email = "tomer@fooks.co.il"
  const pass = "Tomer123!"

  it("Testing User Login..", () => {
    const options = {
      hostname: 'http://localhost:4000/users/login"',
      path: "/users/login",
      port: 4000,
      method: "POST",
      body: JSON.stringify({
        email,
        pass,
        ip: "100.100.100.10",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }

    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        expect(data.body).toHaveProperty("token")
      })
    })
  })
})
