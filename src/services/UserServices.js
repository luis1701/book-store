const users = [
  {
    name: "Luis Delgado",
    user: "luis02",
    email: "luis@gmail.com",
    role: "ADMIN",
    password: "luis02"
  },
  {
    name: "Fernando Lopez",
    user: "luis03",
    email: "fernando@gmail.com",
    role: "USER",
    password: "luis03"
  }
]


function login(user, password) {
  return users.find(userInfo => userInfo.user === user && userInfo.password === password)
}


export {
  login
}