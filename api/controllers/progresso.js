const asyncWrapper = require('../middleware/async')
const Progresso = require('../models/Progresso.js');

const atualizaProgresso = asyncWrapper(async (req, res) => {
        const { usuarioId, perguntaId } = req.params;
        const { status } = req.body;

        const progresso = await Progresso.findOneAndUpdate(
            { usuario: usuarioId, pergunta: perguntaId },
            { status },
            { new: true, upsert: true }
        );
        res.json(progresso);
});

const verificaProgresso = asyncWrapper(async (req, res) => {
    const { usuarioId, perguntaId } = req.params;
    const progresso = await Progresso.findOne({ usuario: usuarioId, pergunta: perguntaId });

    if (!progresso) {
        res.status(404).json('Progresso não encontrado!')
    }

    res.json(progresso);
});

module.exports = { verificaProgresso, atualizaProgresso };