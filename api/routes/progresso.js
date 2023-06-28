const express = require('express')
const router = express.Router()

const {verificaProgresso, atualizaProgresso} = require('../controllers/progresso.js')

router.route('/:usuarioId/:perguntaId').get(verificaProgresso)
router.route('/:usuarioId/:perguntaId').patch(atualizaProgresso)

module.exports = router