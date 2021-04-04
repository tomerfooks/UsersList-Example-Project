module.exports = (email, token) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/users/logout/" + email, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
      },
    })
      .then((json) => json.json())
      .then((data) => {
        if (data.hasOwnProperty("err"))
          return (document.querySelector(".modal p").innerHTML =
            "Login failed. Please try again")
      })
  })
}
