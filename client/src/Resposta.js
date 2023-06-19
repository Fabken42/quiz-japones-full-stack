export default function Resposta({dataValue, url, handleClick}) {
    return (
        <div className='quiz-img-container' onClick={handleClick}>
            <div className='resposta'></div>
            <img src={url} alt={`Imagem ${dataValue}`} data-value={dataValue} />
        </div>
    )
}