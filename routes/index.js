const express = require('express');

const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const brandsRouter = require('./brands');

function useRouter(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/brands', brandsRouter);
}

module.exports = useRouter;