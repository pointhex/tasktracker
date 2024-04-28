import Sequelize from 'sequelize';

import getTaskModel from './tasks.mjs';

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || process.env.SERVER_IP,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == "true"
    }
  }
);

const models = {
  Task: getTaskModel(sequelize, Sequelize)
};

export { sequelize };
export default models;