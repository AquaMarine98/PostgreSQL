const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(10);
const price = Joi.number().strict().integer().min(10);
const image = Joi.string();

const createProductSchema = Joi.object({
    id,
    name: name.required(),
    price: price.required(),
    image: image.required(),
})

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
})

const getProductSchema = Joi.object({
    id: id.required(),
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
}