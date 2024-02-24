import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import models from '../database/models/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../front')));
app.use(express.json());
app.use((req, res, next) => {
    req.context = {
        models
    };
    next();
});
// app.use(cors());

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', '/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/tasks', (req, res) => {
    const dataFromFrontend = req.body;
    const uuidTask = uuidv4();
    req.context.models.tasks[uuidTask] = {
        id: uuidTask,
        name: dataFromFrontend.taskName,
        description: dataFromFrontend.taskDescription,
        done: dataFromFrontend.done
    };
    console.log('Data received from front-end:', dataFromFrontend, uuidTask);

    res.json({ message: 'Data received successfully!', id: uuidTask});
});

app.get('/tasks', (req, res) => {
    return res.json(Object.values(req.context.models.tasks));
});

app.get('/tasks/:id', (req, res) => {
    return res.send(req.context.models.tasks[req.params.id]);
});

app.put('/tasks/:id', (req, res) => {
    const dataFromFrontend = req.body;
    req.context.models.tasks[req.params.id].done = dataFromFrontend.done;
    console.log('Data received from front-end:', dataFromFrontend);

    res.json({ message: 'Data received successfully!' });
});

