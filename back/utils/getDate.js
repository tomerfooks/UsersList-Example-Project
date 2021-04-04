//GETS A DATE AND RETURN IT FORMATTED NICELY
module.exports = (date) => {
  const d = date || new Date()
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d)
  return `${da}-${mo}-${ye}`
}
