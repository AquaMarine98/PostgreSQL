const express = require('express');
const useRouter = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');

const app = express();
const port = process.env.PORT || 3000;

const whitelist = [ 'http://127.0.0.1:5500', 'http://localhost:3000' ];
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) ||  !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
app.use(cors(options));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola, mi server en express');
});

useRouter(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Open server
app.listen(port, () => {
    console.log('Server running in URL: http://localhost:' + port);
});