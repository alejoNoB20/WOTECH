import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Stock = sequelize.define('stock', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name_product: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description_product: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    buy_price_product: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    amount_product: {
        type: DataTypes.INTEGER(50),
        allowNull: false
    },
    value_stock: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    tableName: 'stocks',
    timestamps: false,
    hooks: {
        beforeCreate: (stock) => {
            const amountProduct = stock.amount_product;
            const buyPriceProduct = stock.buy_price_product;
            stock.value_stock = amountProduct * buyPriceProduct;
        },
        beforeUpdate: (stock) => {
            const amountProduct = stock.amount_product;
            const buyPriceProduct = stock.buy_price_product;
            stock.value_stock = amountProduct * buyPriceProduct;
        }
    }
});