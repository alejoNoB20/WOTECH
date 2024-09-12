import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Supplier } from "../Suppliers/suppliersModels.js";
import { Stock } from "../Stock/stocksModels.js";

    export const supplierStockAssociations = sequelize.define('supplierStockAssociations', {
        id_supplier_material: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_material_fk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Stock,
                key: 'id_material'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
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
        amount_material: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price_material: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'supplierStockAssociations'
    });

    Stock.belongsToMany(Supplier, {through: supplierStockAssociations, foreignKey: 'id_material_fk', otherKey: 'id_supplier_fk'});

    Supplier.belongsToMany(Stock, {through: supplierStockAssociations, foreignKey: 'id_supplier_fk', otherKey: 'id_material_fk'});
