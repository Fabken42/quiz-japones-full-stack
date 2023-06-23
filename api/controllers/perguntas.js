const Pergunta = require('../models/Pergunta')
const asyncWrapper = require('../middleware/async')

const pegaPerguntasAleatorias = asyncWrapper(async (req, res) => {
  const perguntas = await Pergunta.aggregate([
    { $sample: { size: 4 } }, // Retorna 4 perguntas aleatórias
    { $group: { _id: null, perguntas: { $push: '$$ROOT' } } }, // Agrupa as perguntas em um único array
    { $project: { perguntas: { $slice: ['$perguntas', 4] } } }, // Seleciona apenas as 4 primeiras perguntas
    { $unwind: '$perguntas' }, // Desconstrói o array de perguntas
    { $replaceRoot: { newRoot: '$perguntas' } } // Define cada pergunta como novo documento raiz
  ])

  res.status(200).json({ perguntas })
})


module.exports = {
  pegaPerguntasAleatorias
}