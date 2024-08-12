import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Clients } from "./clientsModels.js";

export const Orders = sequelize.define('orders', {
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_client: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id_client'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    shipping_address_order: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    delivery_day_order: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orders',
    sequelize
})

Orders.belongsTo(Clients, {
    foreignKey: 'id_client',
    targetKey: 'id_client'
});

Clients.hasMany(Orders, {foreignKey: 'id_client'});