import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../front')));
app.use(express.json());
// app.use(cors());

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', '/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


let tasks = {
    1: { id: '1', name: 'task1', description: 'description1', done: false },
    2: { id: '2', name: 'task2', description: 'description2', done: true }
};

app.post('/tasks', (req, res) => {
    const dataFromFrontend = req.body;
    // tasks.push({ id: uuidv4(), name: dataFromFrontend.taskName, description: dataFromFrontend.taskDescription });
    tasks[uuidv4()] = { id: uuidv4(), name: dataFromFrontend.taskName, description: dataFromFrontend.taskDescription };
    console.log('Data received from front-end:', dataFromFrontend);

    // Process the data or send a response back to the front end
    res.json({ message: 'Data received successfully!' });
});


app.get('/tasks', (req, res) => {
    // res.json(tasks);
    return res.json(Object.values(tasks));
});

app.get('/tasks/:id', (req, res) => {
    return res.send(tasks[req.params.id]);
});

// app.get('/api/data', (req, res) => {
//     const responseData = {
//         message: 'Hello from the backend!',
//         tasks: [{ name: 'task1', description: 'description1' }, { name: 'task2', description: 'description2' }]
//     };
//     res.json(responseData);
// });
