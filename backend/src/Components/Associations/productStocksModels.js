import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Stock } from "../Stock/stocksModels.js";
import { Products } from "../Products/productsModels.js";


export const product_Stocks_association = sequelize.define('product_Stocks_association', {
    id_product_stock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    how_much_contains_use: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

Stock.belongsToMany(Products, {through: product_Stocks_association, foreignKey: {
    name: 'id_material_fk',
    columnName: 'id_material'
}});
Products.belongsToMany(Stock, {through: product_Stocks_association, foreignKey: {
    name: 'id_product_fk',
    columnName: 'id_product'
}});
