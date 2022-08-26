const Joi = require('joi')

const validatUserRegister = (data) => {
    const schema = Joi.object({
        username : Joi.string().required()
    }).unknown()
    return schema.validate(data)
}

module.exports = {
    validatUserRegister
}