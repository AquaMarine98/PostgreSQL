const express = require('express');
const useRouter = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');
const { get } = require('./routes/products');

const app = express();
const port = 3000;

const whitelist = [ 'http://127.0.0.1:5500', 'http://localhost:3000' ];
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
app.use(cors(options));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, mi server en express en la version ' + version);
});

useRouter(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Open server
app.listen(port, () => {
    console.log('Server running in URL: http://localhost:' + port);
});