import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";

export const Products = sequelize.define('products', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_product:{
        type: DataTypes.STRING(80),
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
    },
    map_product: {
        type: DataTypes.STRING,
        allowNull: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName:'products',
    sequelize
})