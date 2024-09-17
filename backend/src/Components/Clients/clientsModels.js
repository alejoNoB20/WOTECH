import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";

export const Clients = sequelize.define('clients', {
    id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name_client: {
        type: DataTypes.STRING(100),
        allowNull: false
    }, 
    last_name_client: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dni_client: {
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false
    },
    province_client: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direction_client: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mail_client: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phone_number_client: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    type_client: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuil_or_cuit_client: {
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'clients',
});
