import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Supplier } from "../Suppliers/suppliersModels.js";

export const Invoices = sequelize.define('invoice', {
    id_invoice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_supplier_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'id_supplier'
        }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'invoice'
});

Invoices.belongsTo(Supplier, {foreignKey: 'id_supplier_fk'});

Supplier.hasMany(Invoices, {foreignKey: 'id_supplier'});