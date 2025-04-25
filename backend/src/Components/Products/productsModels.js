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
        allowNull: false
    },
    img_product: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description_product: {
        type: DataTypes.STRING(300),
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
    indexes: [
      {
        unique: true,
        fields: ['name_product'],
        name: 'unique_products_index'
      }
    ]
  });