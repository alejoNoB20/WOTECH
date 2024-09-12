import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Products } from "../Products/productsModels.js";
import { Tools } from "../Tools/toolsModels.js";

export const productToolsAssociation = sequelize.define('productToolsAssociation',{
    id_product_tools: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tool_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tools,
            key: 'id_tool'
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
        }
    }
}, {
    timestamps: false
})

Products.belongsToMany(Tools, {through: productToolsAssociation, foreignKey: 'id_product_fk', otherKey: 'id_tool_fk'});

Tools.belongsToMany(Products, {through: productToolsAssociation, foreignKey: 'id_tool_fk', otherKey: 'id_product_fk'});