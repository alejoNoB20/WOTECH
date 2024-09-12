import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { supplier_materials_associations } from "./suppliersMaterialsModels.js";

export const PriceControl = sequelize.define('priceControl', {
    id_price_control: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_material_supplier_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplier_Materials_associations',
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

supplier_materials_associations.hasMany(PriceControl, {foreignKey: 'id_material_supplier_fk'});

PriceControl.belongsTo(supplier_materials_associations, {
    foreignKey: 'id_material_supplier_fk',
    targetKey: 'id_supplier_material'
});