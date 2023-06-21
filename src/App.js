import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import PageAdmin from './pages/PageAdmin';
import PageUser from './pages/PageUser';

function App() {

  const [role, setRole] = useState()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    const userInfoToObj = JSON.parse(userInfo)

    if (userInfoToObj.role === 'ADMIN') {
      setRole("ADMIN")
    } else {
      setRole("USER")
    }
  }, [])

  const onLogout = () => {
    localStorage.removeItem('userInfo')
    window.location.reload()
  }

  if (role === undefined) {
    return "Cargando..."
  }

  return (
    <div className="App">
      <button onClick={() => onLogout()}>Logout</button>
      {role === "ADMIN" ? <PageAdmin/>  : <PageUser/>}
    </div>
  );
}

export default App;
