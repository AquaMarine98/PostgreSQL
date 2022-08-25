const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Esto es categories');
});

module.exports = router;