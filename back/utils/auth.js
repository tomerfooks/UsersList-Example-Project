const jwt = require("jsonwebtoken")
//FUNTION TO VERIFY THE USER TOKEN FOR AUTHENTICATION
module.exports = (headers) => {
  if (!headers) return false
  if (!headers.authorization) return false
  if (typeof headers.authorization !== "string") return false
  try {
    const check = jwt.verify(headers.authorization, "elementor")
    if (!check) return false
    const user = jwt.decode(headers.authorization)
    if (!check || !user) return false
    // delete user.iat
    return user
  } catch (e) {
    console.log(e.message)
    return false
  }
}
