const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola, mi server en express');
});

app.get('/products', (req, res) => {
    const products = [];
    const { size } = req.query; 
    const limit = size || 10;
    for(let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.product(),
            price: parseInt(faker.commerce.price()) + '$',
            image: faker.image.imageUrl(),
        })
    }
    res.json(products);
});

app.get('/markets', (req, res) => {
    res.send({
        name: 'veggies',
    });
});

app.get('/products/filter', (req, res) => {
    res.send('Yo soy un filter'); 
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json(
        {
            id,
            name: 'bananas',
            price: 1000 + '$',
        }
    )
});

app.get('/users', (req, res) => {
    const { limit, offset } = req.query;
    if(limit && offset) {
        res.json({
            limit,
            offset,
        });
    } else {
        res.send('No hay parametros');
    }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId,
    })
});



app.listen(port, () => {
    console.log('Server running in port: ' + port);
});