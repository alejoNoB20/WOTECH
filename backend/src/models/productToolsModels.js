import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Products } from "./productsModels.js";
import { Tools } from "./toolsModels.js";

export const productTools = sequelize.define('productTools',{
    id_product_tools: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Products.belongsToMany(Tools, {through: productTools});
Tools.belongsToMany(Products, {through: productTools});