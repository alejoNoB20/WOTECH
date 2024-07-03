import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('wotech', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync({force:false}).then(() => console.log('DBActualizada')).catch(err => console.log(err));