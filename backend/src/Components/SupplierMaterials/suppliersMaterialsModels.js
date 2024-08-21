import { DataTypes } from "sequelize";
import { sequelize } from "../../database/connection.js";
import { Supplier } from "../Suppliers/suppliersModels.js";
import { Stock } from "../Stock/stocksModels.js";

export const supplier_materials_associations = sequelize.define('supplier_Materials_associations', {
    id_supplier_material: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: 'supplier_Materials_associations'
});

Stock.belongsToMany(Supplier, {through: supplier_materials_associations, foreignKey: {
    name: 'id_material',
    columnName: 'id_material'
}});
Supplier.belongsToMany(Stock, {through: supplier_materials_associations, foreignKey: {
    name: 'id_supplier',
    columnName: 'id_supplier'
}});
