import { useState } from "react";
import { login } from "../services/UserServices";

function RegisterUser(props) {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const {setIsAuth} = props

  const cleanState = () => {
    setUser("")
    setPassword("")
  }

  const onLogin = () => {
    const userInfo = login(user, password)
    console.log(userInfo)
    console.log(JSON.stringify(userInfo))
    if (userInfo) {
      setIsAuth(true)
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    } else {
      alert("Sus credenciales son incorrectas")
      cleanState()
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', flexDirection: 'column' }}>
      <div>
        <h1>Welcome to BOOK STORE MEDIA</h1>
      </div>
      <div>
        <input value={user}  type="text" placeholder="Usuario" onChange={(event) => setUser(event.target.value)} />
        <input value={password} type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  )
}

export default RegisterUser;