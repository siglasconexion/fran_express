import { Sequelize, DataTypes, Op } from 'sequelize'

const db = {}

  db.sequelize = new Sequelize('dbname', 'root', 'test', {
    host: 'localhost',
    dialect: 'mysql'
  });
  (async () => {

      try {
          await db.sequelize.authenticate();
          console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error.message);
        }
    })()
        
export default db