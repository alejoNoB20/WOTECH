import {Sequelize} from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export const updateDB = () => {
    sequelize.sync({alter: true})
        .then(()=> console.log('DB Actualizada correctamente!'))
            .catch(err => console.log(err));
};

export const clearDB = () => {
    sequelize.sync({force: true})
        .then(()=> console.log('DB Reiniciada correctamente!'))
            .catch(err => console.log(err));
};

