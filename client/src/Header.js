import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="cabecalho">
            <Link to="/" className="link logo">Quiz de Japonês</Link>
            <nav>
                <Link to="/login" className="link link-login">Login</Link>
                <Link to="/register" className="link link-register">Cadastrar</Link>
            </nav>
        </header>
    )
}