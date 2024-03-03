// const { sequelize } = require('../models/index.mjs');
import { sequelize } from "../models/index.mjs";

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

test('create a task', async () => {
    const task = await sequelize.models.Task.getTaskModel({
        id: '1',
        name: 'task1',
        description: 'description1',
        done: false
    });
    expect(task.id).toEqual('1');
});
