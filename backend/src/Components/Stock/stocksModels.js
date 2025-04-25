import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";

export const Stock = sequelize.define('stock', {
    id_material: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name_material: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    description_material: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    amount_material: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    measurement_material: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'stock',
    indexes: [
      {
        unique: true,
        fields: ['name_material'],
        name: 'unique_stock_index'
      }
    ]
  });
