import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Supplier } from "./suppliersModels.js";

export const Invoices = sequelize.define('invoice', {
    id_invoice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_supplier: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplier',
            key: 'id_supplier'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'invoice'
});

Invoices.belongsTo(Supplier, {
    foreignKey: 'id_supplier',
    targetKey: 'id_supplier'
});

Supplier.hasMany(Invoices, {foreignKey: 'id_supplier'});