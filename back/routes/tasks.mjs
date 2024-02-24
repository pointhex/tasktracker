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

router.post('/', (req, res) => {
    const dataFromFrontend = req.body;
    const uuidTask = uuidv4();
    req.context.models.tasks[uuidTask] = {
        id: uuidTask,
        name: dataFromFrontend.taskName,
        description: dataFromFrontend.taskDescription,
        done: dataFromFrontend.done
    };
    console.log('Data received from front-end:', dataFromFrontend, uuidTask);

    res.json({ message: 'Data received successfully!', id: uuidTask });
});

router.get('/', (req, res) => {
    return res.json(Object.values(req.context.models.tasks));
});

router.get('/:id', (req, res) => {
    return res.send(req.context.models.tasks[req.params.id]);
});

router.put('/:id', (req, res) => {
    const dataFromFrontend = req.body;
    req.context.models.tasks[req.params.id].done = dataFromFrontend.done;
    console.log('Data received from front-end:', dataFromFrontend);

    res.json({ message: 'Data received successfully!' });
});

export default router;