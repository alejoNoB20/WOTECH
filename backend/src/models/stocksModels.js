import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Stock = sequelize.define('stock', {
    id_material: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name_material: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    description_material: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    buy_price_material: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    amount_material: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    how_much_contains: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_amount_material: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'stock',
    sequelize,
});
