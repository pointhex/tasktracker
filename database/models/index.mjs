import Sequelize from 'sequelize';

import getTaskModel from './tasks.mjs';

const sequelize = new Sequelize(
  process.env.DATABASE || 'postgres',
  process.env.DATABASE_USER || 'postgres',
  process.env.DATABASE_PASSWORD || '',
  {
    dialect: 'postgres',
  },
);

const models = {
  Task: getTaskModel(sequelize, Sequelize)
};

export { sequelize };
export default models;