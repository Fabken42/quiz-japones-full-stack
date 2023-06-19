import { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
// import {UserContext} from '../UserContext.js'

export default function LoginPage() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    // const [redirect, setRedirect] = useState(false)
    // const {setUserInfo} = useContext(UserContext)

    async function login(ev){
        ev.preventDefault();
    //     const response = await fetch('http://localhost:4000/login',{
    //         method:'POST',
    //         body: JSON.stringify({username, password}),
    //         headers: {'Content-Type': 'application/json'},
    //         credentials:'include'
    //     })
    //     if(response.ok){
    //         response.json().then(userInfo=>{
    //             setUserInfo(userInfo)
    //             setRedirect(true)
    //         })
    //     } else{
    //         window.alert('Credenciais Inválidas')
    //     }
    // }

    // if(redirect){
    //     return <Navigate to={'/'}/>
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="usuário" onChange={(ev) => setUsuario(ev.target.value)} value={usuario} />
            <input type="password" placeholder="senha" onChange={(ev) => setSenha(ev.target.value)} value={senha} />
            <button>Login</button>
        </form>
    )
}

