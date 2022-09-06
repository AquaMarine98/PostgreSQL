const { Model, DataTypes, Sequelize } = require('sequelize');

const BRAND_TABLE = 'brands';

const BrandSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    }
}

class Brand extends Model {
    static associate() {
        // associate
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BRAND_TABLE,
            modelName: 'Brand',
            timestamps: false
        }
    }
}

module.exports = { BRAND_TABLE, BrandSchema, Brand };