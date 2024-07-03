import { Sequelize, DataTypes} from "sequelize";
import { sequelize } from "../database/connection.js";

export const Tools = sequelize.define('tools', {
    id_tool: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_tool: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description_tool: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    status_tool: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_tool: {
        type: DataTypes.STRING,
        allowNull: false
    },
    repair_date_tool : {
        type: DataTypes.DATE,
        allowNull: true
    }
},
    {
        tableName: 'tools',
        sequelize,
        // hooks:{
        //     beforeCreate: (tools) => {
        //         if (tools.status_tool === 'missing'){
        //             tools.location_tool = 
        //         }
        //     },
        //     beforeUpdate: (tools) => {

        //     }
        // }
    })