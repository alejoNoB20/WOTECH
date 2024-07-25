import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Products = sequelize.define('products', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_product:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    img_product: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    description_product: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    price_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName:'products',
    sequelize
})