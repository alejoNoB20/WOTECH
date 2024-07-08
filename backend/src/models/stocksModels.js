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
    contains: {
        type: DataTypes.STRING(2),
        allowNull: true
    },
    how_much_contains : {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_amount_material: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    value_stock: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    tableName: 'stock',
    sequelize,
    hooks: {
        beforeCreate: (stock) => {
            const amountMaterial = stock.amount_material;
            const buyPriceMaterial = stock.buy_price_material;
            const howMuchContains = stock.how_much_contains;
            const contains = stock.contains;
            if(contains === 'on'){
                stock.total_amount_material = amountMaterial * howMuchContains;
            }
            stock.value_stock = amountMaterial * buyPriceMaterial;
        },
        beforeUpdate: (stock) => {
            const amountMaterial = stock.amount_material;
            const buyPricematerial = stock.buy_price_material;
            const howMuchContains = stock.how_much_contains;
            const contains = stock.contains;
            if(contains === 'on'){
                stock.total_amount_material = amountMaterial * howMuchContains;
            }
            stock.value_stock = amountMaterial * buyPricematerial;
        }
    }
});
