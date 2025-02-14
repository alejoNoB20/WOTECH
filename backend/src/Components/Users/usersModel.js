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
        unique: true
    },
    password_user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type_user: {
        type: DataTypes.STRING,
        allowNull:false
    }
}); 