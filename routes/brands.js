const express = require('express');

const BrandService = require('../services/brand.service');

const router = express.Router();
const service = new BrandService();

router.get('/', async (req, res, next) => {
    try {
        const brands = await service.find();
        res.status(201).json(brands);
    } catch (err) {
        next(err);
    }
});

module.exports = router;