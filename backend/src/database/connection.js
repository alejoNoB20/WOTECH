import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('wotech', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
