const express = require('express')
const router = express.Router()

const{
    pegaPerguntasAleatorias
} = require('../controllers/perguntas')

router.route('/').get(pegaPerguntasAleatorias)

module.exports = router