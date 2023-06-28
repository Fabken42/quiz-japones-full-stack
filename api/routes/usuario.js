const express = require('express')
const router = express.Router()

const{
    cadastrar, login, logout, validaPerfil
} = require('../controllers/usuario')

router.route('/cadastrar').post(cadastrar)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/perfil').get(validaPerfil)


module.exports = router