import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { supplier_materials_associations } from "../SupplierMaterials/suppliersMaterialsModels.js";

export const Purchase = sequelize.define('purchase', {
    id_purchase: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_supplier_material: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'supplier_Materials_associations',
            key: 'id_supplier_material'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    unit_material: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'purchase'
});

supplier_materials_associations.hasMany(Purchase, {foreignKey: 'id_supplier_material'});

Purchase.belongsTo(supplier_materials_associations, {
    foreignKey: 'id_supplier_material',
    targetKey: 'id_supplier_material'
});