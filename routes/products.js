const express = require('express');

const ProductService = require('../services/products');

const router = express.Router();
const service = new ProductService();

/* router.get('/', (req, res) => {
    const products = service.find();

    res.json(products);
}); */

router.get('/', (req, res) => {
    const filter = req.query.name || req.query.price || null;
    const products = service.find(filter);

    res.json(products);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);

    res.json(product);
});

router.post('/', (req, res) => {
    const body = req.body;
    service.create(body)
        .then(data => {
            res.status(201).json(data);
            console.log('Objeto creado!');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: 'update',
        data: body,
        id,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'deleted',
        id,
    });
});

module.exports = router;