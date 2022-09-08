const Joi = require('joi');

const id = Joi.number().strict().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
})

const updateUserSchema = Joi.object({
    email,
    password
})

module.exports = {
    createUserSchema,
    updateUserSchema
}