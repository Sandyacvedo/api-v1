const bcrypt = require('bcryptjs')
const async = require('co')

const encrypt = async (textPlain) => {
    const hash = bcrypt.hash(textPlain, 10)
    return hash
}

const compare = async.wrap(function* (passwordPlain, hashpassword) {
    return yield bcrypt.compare(passwordPlain, hashpassword)
})

module.exports = {encrypt, compare}