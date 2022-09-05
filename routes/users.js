const express = require('express');

const UserService = require('../services/user.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users);
    } catch(err) {
        next(err);
    }
});

module.exports = router;