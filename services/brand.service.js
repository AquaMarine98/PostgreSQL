const { models } = require("./../libs/sequelize");

class BrandService {
    constructor() {
    }

    async find() {
        const rta = await models.Brand.findAll();
        return rta;
    }
}

module.exports = BrandService;