'use stric'

let usuariosRouter = require('./usuarios')

module.exports = (app) => {
    app.use('/usuarios', usuariosRouter)
} 