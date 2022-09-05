const express = require('express');

const ProductService = require('../services/products');
const validatorHandler = require('../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/', async(req, res, next) => {
    try {
        const filter = req.query.name || req.query.price || null;
        const products = await service.find(filter);

        res.status(201).json(products);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);   
        }
    }
);

router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    (req, res) => {
        const body = req.body;
        service.create(body)
            .then(data => {
                res.status(201).json(data);
                console.log('Objeto creado!');
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
);

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const product = await service.update(id, body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = service.delete(id);
    res.json(rta);
});

module.exports = router;