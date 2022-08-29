const express = require('express');

const ProductService = require('../services/products');

const router = express.Router();
const service = new ProductService();

/* router.get('/', (req, res) => {
    const products = service.find();

    res.json(products);
}); */

router.get('/', async(req, res) => {
    const filter = req.query.name || req.query.price || null;
    const products = await service.find(filter);

    res.json(products);
});

router.get('/:id', async(req, res) => {
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

router.patch('/:id', async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const product = await service.update(id, body);
        res.status(201).json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = service.delete(id);
    res.json(rta);
});

module.exports = router;