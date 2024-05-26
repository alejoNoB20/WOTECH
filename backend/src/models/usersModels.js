import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

const user = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_dni: {
        type: DataTypes.CHAR(8),
        allowNull: false
    },
    user_level:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_number_phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    user_inscription: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_mail: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});