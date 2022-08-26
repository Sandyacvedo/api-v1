const Joi = require('joi');

const validateUserLogin = (data) => {
    const schema = Joi.object({
        username : Joi.string().required().messages({
          "any.required" : '@body username is require'  
        }), 
        password: Joi.string().required().messages({
            "any.required" : "@body password is require"
        })
    }).unknown()
    return schema.validate(data)
}

const validateUserRegister = (data) => {
    const schema = Joi.object({
        nombre: Joi.string().required().messages({
            "any.required" : '@body nombre is require'  
        }),
        usuario: Joi.string().required().messages({
            "any.required" : '@body usuario is require'  
        }),
        apellido: Joi.string().required().messages({
            "any.required" : '@body apellido is require'  
        }),
        password: Joi.string().required().messages({
            "any.required" : '@body password is require'  
        })
    }).unknown()
        return schema.validate(data)
}

module.exports = {
    validateUserLogin,
    validateUserRegister
}