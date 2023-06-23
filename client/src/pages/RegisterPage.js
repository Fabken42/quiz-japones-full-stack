import { useState } from "react"
import axios from 'axios'

export default function RegisterPage() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    async function register(ev) {
        ev.preventDefault();

        if (nome.length < 5) {
            alert('Nome e senha devem ter pelo menos 5 caracteres');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4200/api/usuario/cadastrar', { nome, senha });
            if (response.status !== 200) {
                alert('Falha ao cadastrar!');
            } else {
                alert('Cadastro feito com sucesso!');
            }
        } catch (error) {
            console.log(error);
            alert('Falha ao cadastrar!');
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Cadastrar</h1>
            <input type="text" placeholder="usuário" name="usuario" value={nome} onChange={ev => setNome(ev.target.value)} />
            <input type="password" placeholder="senha" name="senha" value={senha} onChange={ev => setSenha(ev.target.value)} />
            <button>Cadastrar</button>
        </form>
    )
}