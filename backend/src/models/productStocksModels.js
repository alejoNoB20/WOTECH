import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Stock } from "./stocksModels.js";
import { Products } from "./productsModels.js";


export const productStocks = sequelize.define('productStocks', {
    id_product_stock: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    how_much_contains_use: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Stock.belongsToMany(Products, {through: productStocks});
Products.belongsToMany(Stock, {through: productStocks});
