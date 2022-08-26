const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')

const verifyjwt = (req, res, next) => {
    let token = req.header('authorization')
    
    if(token && token.toLowerCase().startsWith('bearer')) {
        token = token.substring(7)
    }
    
    try {
        console.log('token -->\n\n\n', token)
        if (!token) {
          return res.status(401).json({ error: "Acceso Denegado" });
        }

        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decodeToken
        next()
    } catch (error) {
        res.status(400).json({error: 'Token no es valido'})
    }

}

module.exports = verifyjwt;