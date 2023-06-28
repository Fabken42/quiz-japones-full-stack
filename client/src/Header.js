import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import axios from 'axios'

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    if (userInfo.nome !== undefined) {
      axios.get('http://localhost:4200/api/usuario/perfil', { withCredentials: true })
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  function logout() {
    axios.post('http://localhost:4200/api/usuario/logout', null, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const nome = userInfo?.nome

  return (
    <header className="cabecalho">
      <Link to="/" className="link logo">Quiz de Japonês - Fabrício K.</Link>
      <nav>
        {nome && <>
          <a className='link-logout' onClick={logout}>Sair</a>
        </>}
        {!nome && <>
          <Link to="/login" className="link-login">Entrar</Link>
          <Link to="/register" className="link-cadastro">Cadastrar</Link>
        </>}
      </nav>
    </header>
  )
}