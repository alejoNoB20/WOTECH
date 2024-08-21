import { sequelize } from "../../database/connection.js";
import { DataTypes } from "sequelize";

export const Supplier = sequelize.define('supplier', {
    id_supplier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_company_supplier: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    reason_social_supplier: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    cuit_company_supplier: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    description_supplier: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },
    tax_address_supplier: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    number_phone_company_supplier: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    mail_company_supplier: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website_company_supplier: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    distributor_name_supplier: {
        type: DataTypes.STRING(80),
        allowNull: true
    },
    number_phone_distributor_supplier: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    mail_distributor_supplier: {
        type: DataTypes.STRING,
        allowNull: true
    },
    delivery_days_suppier: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    payment_method_supplier: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'supplier'
});