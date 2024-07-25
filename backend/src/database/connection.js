import {Sequelize} from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

// sequelize.sync({alter: true}).then(() => console.log('DBActualizada')).catch(err => console.log(err));