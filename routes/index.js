const productsRouter = require('./products');

function useRouter(app) {
    app.use('/api/products', productsRouter);
}

module.exports = useRouter;