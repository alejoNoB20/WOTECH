import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";

export const Users = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_user: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    indexes: [
      {
        unique: true,
        fields: ['username_user', 'password_user'],
        name: 'unique_user_index'
      }
    ]
  });