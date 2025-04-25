import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";

export const Tools = sequelize.define('tools', {
    id_tool: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    img_tool: {
        type: DataTypes.STRING,
        allowNull:true
    },
    name_tool: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    description_tool: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    status_tool: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_tool: {
        type: DataTypes.STRING,
        allowNull: false
    },
    repair_shop_tool: {
        type: DataTypes.STRING(150),
        allowNull:true
    },
    repair_date_tool: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    search_repair_tool: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    tableName: 'tools',
    indexes: [
      {
        unique: true,
        fields: ['name_tool'],
        name: 'unique_tool_index'
      }
    ]
  });