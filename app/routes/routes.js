'use stric'

let usuariosRouter = require('./usuarios');
let authRouter = require('./auth');
const verifyjwt = require('../middleware/auth');

module.exports = (app) => {
    app.use('/usuarios', verifyjwt, usuariosRouter);
    app.use('/auth', authRouter)



    // midleware handle errors
    app.use((err, req, res, next) => {
        // treat as 404
        if (err.message &&
            (~err.message.indexOf('not found') ||
                (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.log("ERR API=>>>>", err);

        if (err.stack !== undefined) {
            if (err.stack.includes('ValidationError')) {
                res.status(422).json({
                    estado: 422,
                    error: err.message,
                    mensaje: err.stack
                })
                return;
            }
        }

        res.status(500).send({
            estado: 500,
            error: err.message || "error",
            mensaje: err.stack || err
        });
    })

    app.use((req, res) => {
        const payload = {
            estado: 404,
            error: "Not found",
            mensaje: "Not found " + req.originalUrl
        }
        return res.status(404).json(payload);
    })
} 