import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Orders } from "../Orders/ordersModels.js";
import { Products } from "../Products/productsModels.js";

export const orderProductsAssociation = sequelize.define('orderProductsAssociation', {
    id_order_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    id_product_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'id_product'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_order_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'id_order'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    unit_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Orders.belongsToMany(Products, {through: orderProductsAssociation, foreignKey: 'id_order_fk', otherKey: 'id_product_fk'});

Products.belongsToMany(Orders, {through: orderProductsAssociation, foreignKey: 'id_product_fk', otherKey: 'id_order_fk'});