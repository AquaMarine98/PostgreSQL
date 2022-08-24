const express = require('express');
const { faker } = require('@faker-js/faker');

const useRouter = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola, mi server en express');
});

useRouter(app);


// Open server
app.listen(port, () => {
    console.log('Server running in URL: http://localhost:' + port);
});