import { useState } from "react"

export default function RegisterPage() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    async function register(ev) {
        ev.preventDefault();

        if (nome.length < 5 || senha.length < 5) {
            alert('Nome e senha devem ter pelo menos 5 caracteres');
            return;
        }

        try {
            const response = await fetch('http://localhost:4200/api/usuario/cadastrar', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nome, senha })
            });
          
            if (response.ok) {
              alert('Cadastro feito com sucesso!');
            } else {
              alert('Falha ao cadastrar!');
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