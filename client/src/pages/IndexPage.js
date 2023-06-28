import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinStars, faFaceGrinWide, faSmile, faMeh, faFaceFrownOpen, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Resposta from '../Resposta';
import CarregandoPage from './CarregandoPage';
import { useContext } from 'react';
import { UserContext } from "../UserContext.js"
export default function IndexPage() {
    const { userInfo } = useContext(UserContext)
    const usuarioLogado = userInfo?.nome !== undefined

    const iconeMapa = [
        { emoji: faSadTear, cor: 'rgb(165, 0, 255)' },
        { emoji: faFrown, cor: 'rgb(255, 0, 0)' },
        { emoji: faFaceFrownOpen, cor: 'rgb(255, 123, 0)' },
        { emoji: faMeh, cor: 'rgb(255, 251, 0)' },
        { emoji: faSmile, cor: 'rgb(200, 255, 0)' },
        { emoji: faFaceGrinWide, cor: 'rgb(0, 255, 32)' },
        { emoji: faFaceGrinStars, cor: 'rgb(0, 174, 255)' }]

    const [primeiroCarregamento, setPrimeiroCarregamento] = useState(true)
    const [iconeEmoji, setIconeEmoji] = useState()
    const [corEmoji, setCorEmoji] = useState()
    const [atualizaEmoji, setAtualizaEmoji] = useState(0)
    const [progresso, setProgresso] = useState(3)
    const [perguntas, setPerguntas] = useState([])
    const [optCorreta, setOptCorreta] = useState()
    const [carregando, setCarregando] = useState(true)
    const [jogadas, setJogadas] = useState(0)

    async function pegaPerguntas() {
        try {
            const resPerguntas = await fetch('http://localhost:4200/api/perguntas')
            const dados = await resPerguntas.json()
            setPerguntas(() => dados.perguntas)
            setOptCorreta(() => Math.floor(Math.random() * 4))
        } catch (error) {
            console.log(error);
        }
    }

    async function pegaProgresso(userId) {
        try {
            const perguntaId = perguntas[optCorreta]._id
            const resProgresso = await fetch(`http://localhost:4200/api/progresso/${userId}/${perguntaId}`);
            if (resProgresso.ok) {
                const data = await resProgresso.json();
                setProgresso(() => data.status);
            } else {
                setProgresso(() => 3);
            }
            setAtualizaEmoji(atualizaEmoji + 1)

        } catch (err) {
            console.log(err);
        }
    };

    async function atualizaProgresso(valor, userId) {
        try {
            const perguntaId = perguntas[optCorreta]._id
            await fetch(`http://localhost:4200/api/progresso/${userId}/${perguntaId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: valor })
            });
        } catch (error) {
            console.error('Erro ao criar o progresso:', error);
        }
    };

    useEffect(() => {
        pegaPerguntas()
    }, [jogadas])

    useEffect(() => {
        setCarregando(() => false)
        if (!primeiroCarregamento) {
            if (usuarioLogado)
                pegaProgresso(userInfo.id);
        }
        else
            setPrimeiroCarregamento(false)
    }, [perguntas])

    useEffect(() => {
        if (!primeiroCarregamento) {
            setIconeEmoji(iconeMapa[progresso].emoji)
            setCorEmoji(iconeMapa[progresso].cor)
        }
    }, [atualizaEmoji])


    const respostas = perguntas.map((pergunta, indice) =>
        <Resposta key={pergunta._id} dataValue={indice} url={pergunta.imagem} handleClick={handleClick} />)

    function handleClick(ev) {
        const imgEl = document.querySelector(`.quiz-img-container img[data-value="${optCorreta}"]`);
        const respostaCertaEl = imgEl.parentElement.querySelector('.resposta');
        respostaCertaEl.classList.add('resposta-certa');

        const jogada = parseInt(ev.target.getAttribute('data-value'));
        const respostaErradaEl = ev.target.parentNode.querySelector('.resposta');

        if (jogada !== optCorreta) {
            if (usuarioLogado && progresso > 0)
                atualizaProgresso(progresso - 1, userInfo.id)

            respostaErradaEl.classList.add('resposta-errada');
            setTimeout(() => {
                respostaErradaEl.classList.remove('resposta-errada');
                respostaCertaEl.classList.remove('resposta-certa');
                setJogadas((prevJogadas) => prevJogadas + 1)
            }, 1200);
        } else {
            if (usuarioLogado && progresso < 6)
                atualizaProgresso(progresso + 1, userInfo.id)

            setTimeout(() => {
                respostaCertaEl.classList.remove('resposta-certa');
                setJogadas((prevJogadas) => prevJogadas + 1)
            }, 1200);
        }
    }

    if (carregando) {
        return <CarregandoPage />;
    }

    return (
        <div className="quiz-container">
            <div className='pergunta-container'>
                {usuarioLogado && <div className='emoji'><FontAwesomeIcon icon={iconeEmoji} size="2x" color={corEmoji} /></div>}
                <h2 className='pergunta'>{perguntas.length > 0 ? perguntas[optCorreta].pergunta : ''}</h2>
                {usuarioLogado && <div className='emoji'><FontAwesomeIcon icon={iconeEmoji} size="2x" color={corEmoji} /></div>}
            </div>
            <div className="image-grid">
                {respostas}
            </div>
        </div>
    )
}