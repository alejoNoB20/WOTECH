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
    total_amount_product: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    value_stock: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    tableName: 'stock',
    timestamps: false,
    hooks: {
        beforeCreate: (stock) => {
            const amountProduct = stock.amount_product;
            const buyPriceProduct = stock.buy_price_product;
            const howMuchContains = stock.how_much_contains;
            const contains = stock.contains;
            if(contains === 'on'){
                stock.total_amount_product = amountProduct * howMuchContains;
            }
            stock.value_stock = amountProduct * buyPriceProduct;
            console.log(stock.value_stock, amountProduct, buyPriceProduct);
        },
        beforeUpdate: (stock) => {
            const amountProduct = stock.amount_product;
            const buyPriceProduct = stock.buy_price_product;
            const howMuchContains = stock.how_much_contains;
            const contains = stock.contains;
            if(contains === 'on'){
                stock.total_amount_product = amountProduct * howMuchContains;
            }
            stock.value_stock = amountProduct * buyPriceProduct;
        }
    }
});

sequelize.sync().then(() => console.log('DBActualizada')).catch(err => console.log(err));