import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Stock } from "../Stock/stocksModels.js";
import { Products } from "../Products/productsModels.js";


export const productStocksAssociation = sequelize.define('productStocksAssociation', {
    id_product_stock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_material_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Stock,
            key: 'id_material'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_product_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id_product'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    how_much_contains_use: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
})

Stock.belongsToMany(Products, {through: productStocksAssociation, foreignKey: 'id_material_fk', otherKey: 'id_product_fk'});

Products.belongsToMany(Stock, {through: productStocksAssociation, foreignKey: 'id_product_fk', otherKey: 'id_material_fk'});