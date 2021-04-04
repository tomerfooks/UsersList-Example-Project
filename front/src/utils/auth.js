import Cookie from "js-cookie"

const auth = () => {
  //REMOVES COOKIE
  Cookie.remove("token")

  //DECODEING THE TOKEN INTO USER DATA
  function parseJwt(token) {
    var base64Url = token.split(".")[1]
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )
    return JSON.parse(jsonPayload)
  }
  //IF A TOKEN EXISTS IN COOKIE, RETURN THE DECODED INFORMATION
  if (Cookie.get("token") && Cookie.get("token") !== "undefined") {
    return JSON.parse(Cookie.get("token"))
  } else return null
}
export default auth
