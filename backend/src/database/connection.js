import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('wotech', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      foreingKeys: true
    }
});

sequelize.sync({force:true}).then(() => console.log('DBActualizada')).catch(err => console.log(err));