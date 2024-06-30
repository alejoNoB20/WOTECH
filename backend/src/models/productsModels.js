import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Productions = sequelize.define('productions', {
    id_production: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_production:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    img_production: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    description_production: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tools_use_production: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    materials_of_production: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName:'productions',
    sequelize
})