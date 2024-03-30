import models from '../../database/models/index.mjs';

import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
    req.context = {
        models
    };
    next();
});

router.post('/', async (req, res) => {
    const dataFromFrontend = req.body;
    const uuidTask = uuidv4();
    console.log('Data received from front-end:', dataFromFrontend, uuidTask);
    try {
        await req.context.models.Task.create({
            id: uuidTask,
            name: dataFromFrontend.taskName,
            description: dataFromFrontend.taskDescription,
            done: dataFromFrontend.done
        });

        res.json({ message: 'Data received successfully!', id: uuidTask });
    } catch (error) {
        console.error('Error:', error);
    }

});

router.get('/', async (req, res) => {
    console.log('Data sent to front-end:');
    try {
        await req.context.models.Task.findAll().then((tasks) => {
            res.json(tasks);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

router.get('/:id', async (req, res) => {
    await req.context.models.Task.findTaskById(req.params.id).then((task) => {
        res.json(task);
    });
});

router.put('/:id', async (req, res) => {
    const dataFromFrontend = req.body;
    console.log('Data received from front-end:', dataFromFrontend);
    try {
        await req.context.models.Task.update({
            done: dataFromFrontend.done
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.json({ message: 'Data received successfully!' });
    } catch (error) {
        console.error('Error:', error);
        return res.json({ message: 'Error updating data!' });
    }

});

export default router;
