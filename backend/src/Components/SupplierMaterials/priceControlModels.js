import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { supplierStockAssociations } from "./suppliersMaterialsModels.js";

export const PriceControl = sequelize.define('priceControl', {
    id_price_control: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_material_supplier_fk: {
        type: DataTypes. INTEGER,
        allowNull: false,
        references: {
            model: supplierStockAssociations,
            key: 'id_supplier_material'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    register_price_control: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: false,
    deletedAt: false
});

PriceControl.belongsTo(supplierStockAssociations, {foreignKey: 'id_material_supplier_fk'});

supplierStockAssociations.hasMany(PriceControl, {foreignKey: 'id_material_supplier_fk'});
