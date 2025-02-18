import { Sequelize } from "sequelize";
import fs from "fs";
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    // port: process.env.PORT,
    dialect: 'mysql',
    logging: false,
    // dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: true,
    //         require: true,
    //         ca: fs.readFileSync("./src/database/ca.pem").toString()
    //     }
    // }
});

export const updateDB = async () => {
    try{
        await sequelize.sync({ alter: true });
        console.log('DB creada correctamente!');
    }catch(err) {
        console.log('Error a la hora de actualiza la DB: ', err);
    }
};

export const connectDB = async () => {
    try{
        await sequelize.sync({ alter: true });
        console.log('Conectado correctamente a la DB!');
    }catch(err) {
        console.log('Error a la hora de actualiza la DB: ', err);
    }
};

export const clearDB = async () => {
    try{
        await sequelize.drop();
        await sequelize.sync({ force: true });
        console.log('DB Reiniciada correctamente!');
    }catch(err) {
        console.log('Error a la hora de reiniciar la DB: ', err);
    }
};

