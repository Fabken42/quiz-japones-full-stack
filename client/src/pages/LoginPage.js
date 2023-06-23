import { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext.js'

export default function LoginPage() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function login(ev){
      ev.preventDefault();
      const response = await fetch('http://localhost:4200/api/usuario/login',{
          method:'POST',
          body: JSON.stringify({nome, senha}),
          headers: {'Content-Type': 'application/json'},
          credentials:'include'
      })
      if(response.ok){
          response.json().then(userInfo=>{
              setUserInfo(userInfo)
              setRedirect(true)
          })
      } else{
          window.alert('Credenciais Inválidas')
      }
  }
  
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Entrar</h1>
            <input type="text" placeholder="usuário" onChange={(ev) => setNome(ev.target.value)} value={nome} />
            <input type="password" placeholder="senha" onChange={(ev) => setSenha(ev.target.value)} value={senha} />
            <button>Entrar</button>
        </form>
    )
}

