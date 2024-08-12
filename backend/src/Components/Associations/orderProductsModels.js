import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Orders } from "../Orders/ordersModels.js";
import { Products } from "../Products/productsModels.js";

export const order_Products_association = sequelize.define('order_Products_association', {
    id_order_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    amount_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_product_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id_product'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_order_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id_order'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

Orders.belongsToMany(Products, {through: order_Products_association, foreignKey: 'id_order_fk'});

Products.belongsToMany(Orders, {through: order_Products_association, foreignKey: 'id_product_fk'});