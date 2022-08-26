'use strict'

// Dependencies

const async = require('co')
const { validateUserLogin, validateUserRegister } = require('../helpers/validateUser');
const {compare, encrypt} = require('../helpers/handleBcrypt')
const jwt = require('jsonwebtoken')
const Auth = require('../models/auth')

const login = async.wrap(function* (req, res, next) {
    try {

        const { error } = validateUserLogin(req.body)

        error && (
            res.status(400).send(error.details[0].message)
        )
        
        let auth = new Auth;
        const { username, password } = req.body

        const user = yield auth.findOne(username)

        const verifyPass = user.length > 0 ? yield compare(password, user[0]?.password) : false;
        // console.log('verifypass -->\n\n\n', verifyPass)
        if(!user[0] && !verifyPass) {
            return res.status(400).json({error: 'usuario o contraseña invalidos'})
        }

        // console.log('secret -->\n\n\n', process.env.TOKEN_SECRET)
        const userForToken = {
            id : user[0].id,
            name: user[0].nombre,
            user: username
        }
        const token = jwt.sign(userForToken, process.env.TOKEN_SECRET, {expiresIn: '1h'})

        // const result = yield auth.getUsername(username) // validar que usuario exista
        // console.log('pass --> \n\n\n', hashpass);
        res.header('authorization', token).json({
            erro: null,
            data: token
        })
    }
    catch (err) {
        next(err)
    }
})

const register = async.wrap(function* (req, res, next) {
    try{
        
        const { error } = validateUserRegister(req.body)
        error && (
            res.status(400).send(error.details[0].message)
        )
        const auth = new Auth; 
        const nombre = req.body.nombre;
        const usuario = req.body.usuario;
        const apellido = req.body.apellido;
        const password = yield encrypt(req.body.password);
        
        //validate if usuario exist
        const isUsuarioExist = yield auth.findOne(usuario);

        if (isUsuarioExist) {
            return res.status(400).json({error: 'Usuario ya registrado'})
        };

        const result = yield auth.registerUser(nombre, usuario, apellido, password)

        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
})

module.exports = {
    login,
    register
}