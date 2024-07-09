import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Products } from "./productsModels.js";
import { Tools } from "./toolsModels.js";

export const product_Tools_association = sequelize.define('product_Tools_association',{
    id_product_tools: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Products.belongsToMany(Tools, {through: product_Tools_association, foreignKey: {
    name: 'id_product_fk',
    columnName: 'id_product'
}});
Tools.belongsToMany(Products, {through: product_Tools_association, foreignKey: {
    name: 'id_tool_fk',
    columnName: 'id_tool'
}});