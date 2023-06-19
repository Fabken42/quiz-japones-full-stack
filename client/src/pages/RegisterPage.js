import { useState } from "react"

export default function RegisterPage() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    async function register(ev) {
        ev.preventDefault()
        // const res = await fetch('http://localhost:4000/register', {
        //     method: 'POST',
        //     body: JSON.stringify({ username, password }),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        // if (res.status !== 200)
        // alert('Registration failed!')
        // else {
        //     alert('Registration successful!')
        // }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Cadastrar</h1>
            <input type="text" placeholder="usuário" name="usuario" value={usuario} onChange={ev => setUsuario(ev.target.value)} />
            <input type="password" placeholder="senha" name="senha" value={senha} onChange={ev => setSenha(ev.target.value)} />
            <button>Cadastrar</button>
        </form>
    )
}