const Usuario = require('../models/Usuario')
const asyncWrapper = require('../middleware/async')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)
const secret = process.env.SECRET_KEY

const cadastrar = (asyncWrapper, async (req, res) => {
    const { nome, senha } = req.body
    const userDocument = await Usuario.create({ nome, senha: bcrypt.hashSync(senha, salt) })

    res.json(userDocument);
})

const login = (asyncWrapper, async (req, res) => {
    const { nome, senha } = req.body
    const userDocument = await Usuario.findOne({ nome })

    const passOk = bcrypt.compareSync(senha, userDocument.senha) //retorna true ou false

    jwt.sign({ nome, id: userDocument._id }, secret, {}, (err, token) => {
        if (err) throw err
        res.cookie('token', token).json({
            id: userDocument._id, nome
        })
    })
})

const logout = asyncWrapper(async (req, res) => {
    res.cookie('token', '').json({ msg: 'ok' })
})

const validaPerfil = asyncWrapper(async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            throw err
        }
        res.json(info);
    });

    res.json(req.cookies)
});

module.exports = { cadastrar, login, logout, validaPerfil }