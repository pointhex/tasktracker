import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import models, { sequelize } from '../database/models/index.mjs';

import taskRouter from './routes/tasks.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../front')));
app.use(express.json());

app.use('/tasks', taskRouter);
// app.use(cors());

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', '/index.html'));
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

