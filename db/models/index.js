const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Brand, BrandSchema } = require('./brand.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Brand.init(BrandSchema, Brand.config(sequelize));
}

module.exports = setupModels;