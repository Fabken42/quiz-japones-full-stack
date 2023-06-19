import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceGrinStars, faFaceGrinWide, faSmile, faMeh, faFaceFrownOpen, faFrown, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Resposta from '../Resposta';
import CarregandoPage from './CarregandoPage';

export default function IndexPage() {
    const iconeMapa = [
        { emoji: faSadTear, cor: 'rgb(165, 0, 255)' },
        { emoji: faFrown, cor: 'rgb(255, 0, 0)' },
        { emoji: faFaceFrownOpen, cor: 'rgb(255, 123, 0)' },
        { emoji: faMeh, cor: 'rgb(255, 251, 0)' },
        { emoji: faSmile, cor: 'rgb(200, 255, 0)' },
        { emoji: faFaceGrinWide, cor: 'rgb(0, 255, 32)' },
        { emoji: faFaceGrinStars, cor: 'rgb(0, 174, 255)' }]
    const situacao = 6;//teste
    const icon = iconeMapa[situacao];

    const [perguntas, setPerguntas] = useState([])
    const [optCorreta, setOptCorreta] = useState(Math.floor(Math.random() * 4))
    const [carregando, setCarregando] = useState(true)
    const [jogadas, setJogadas] = useState(0)

    useEffect(() => {
        const fetchPerguntas = async () => {
            try {
                const resposta = await fetch('http://localhost:4200/api')
                const dados = await resposta.json()
                setPerguntas(dados.perguntas)
                setOptCorreta(Math.floor(Math.random() * 4))
                setCarregando(false)
            } catch (error) {
                console.log(error);
                setCarregando(false)
            }
        }
        fetchPerguntas()
    }, [jogadas])

    const respostas = perguntas.map((pergunta, indice) =>
        <Resposta key={pergunta._id} dataValue={indice} url={pergunta.imagem} handleClick={handleClick} />)

    function handleClick(ev) {
        const imgEl = document.querySelector(`.quiz-img-container img[data-value="${optCorreta}"]`);
        const respostaCertaEl = imgEl.parentElement.querySelector('.resposta');
        respostaCertaEl.classList.add('resposta-certa');

        const jogada = parseInt(ev.target.getAttribute('data-value'));
        const respostaErradaEl = ev.target.parentNode.querySelector('.resposta');

        if (jogada !== optCorreta) {
            respostaErradaEl.classList.add('resposta-errada');
            setTimeout(() => {
                respostaErradaEl.classList.remove('resposta-errada');
                respostaCertaEl.classList.remove('resposta-certa');
                setJogadas(jogadas+1)
            }, 1000);
        } else {
            setTimeout(() => {
                respostaCertaEl.classList.remove('resposta-certa');
                setJogadas(jogadas+1)
            }, 1000);
        }
    }

    // Verificar se as perguntas ainda não foram carregadas
    if (carregando) {
        return <CarregandoPage/>; 
    }

    return (
        <div className="quiz-container">
            <div className='pergunta-container'>
                <div className='emoji'><FontAwesomeIcon icon={icon.emoji} size="2x" color={icon.cor} /></div>
                <h2 className='pergunta'>{perguntas.length > 0 ? perguntas[optCorreta].pergunta : ''}</h2>
                <div className='emoji'><FontAwesomeIcon icon={icon.emoji} size="2x" color={icon.cor} /></div>
            </div>
            <div className="image-grid">
                {respostas}
            </div>
        </div>
    )
}