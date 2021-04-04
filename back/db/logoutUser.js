//UPDATES LOGGEDIN FIELD TO FALSE, SO WE CAN TRACK WHO IS ONLINE
module.exports = (email, Users) => {
  return new Promise((resolve, reject) => {
    Users.update({ email }, { $set: { loggedIn: false } })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}
