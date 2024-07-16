import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Products } from "./productsModels";

export const Orders = sequelize.define('orders', {
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})