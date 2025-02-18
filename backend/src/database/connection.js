import { Sequelize } from "sequelize";
import fs from "fs";
import 'dotenv/config';

export let sequelize;

if(process.env.PORT === '8080'){
    // CONEXION A LA DB EN LOCAL
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    });
} else {
    // CONEXION A LA DB EN OVERVIEW
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,
                require: true,
                ca: fs.readFileSync("./src/database/ca.pem").toString()
            }
        }
    });
}

export const updateDB = async () => {
    try{
        await sequelize.sync({ alter: true });
        (process.env.PORT === '8080') ? console.log('DB local creada correctamente!') : console.log('DB remota creada correctamente!')        
    }catch(err) {
        console.log('Error a la hora de actualiza la DB: ', err);
    }
};

export const connectDB = async () => {
    try{
        await sequelize.sync({ alter: true });
        (process.env.PORT === '8080') ? console.log('Conectado correctamente a la DB local!') : console.log('Conectado correctamente a la DB remota!')
    }catch(err) {
        console.log('Error a la hora de actualiza la DB: ', err);
    }
};

export const clearDB = async () => {
    try{
        await sequelize.drop();
        await sequelize.sync({ force: true });
        (process.env.PORT === '8080') ? console.log('DB local reiniciada correctamente!') : console.log('DB remota reiniciada correctamente!')
    }catch(err) {
        console.log('Error a la hora de reiniciar la DB: ', err);
    }
};

