import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

const user = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_level:{
        type: DataTypes.INTEGER(1),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    number_phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    user_inscription: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null
    },
    mail: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});