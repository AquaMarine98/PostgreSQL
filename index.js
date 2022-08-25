const express = require('express');
const { faker } = require('@faker-js/faker');

const useRouter = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, mi server en express en la version ' + version);
});

useRouter(app);


// Open server
app.listen(port, () => {
    console.log('Server running in URL: http://localhost:' + port);
});