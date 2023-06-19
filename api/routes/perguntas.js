const express = require('express')
const router = express.Router()

const{
    pegaPerguntasAleatorias, criaPergunta
} = require('../controllers/perguntas')

router.route('/').get(pegaPerguntasAleatorias).post(criaPergunta)

// router.route('/').get(getAllTasks).post(createTask)
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router