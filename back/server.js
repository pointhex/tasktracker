const express = require('express');
// const cors = require('cors');
const path = require('path');

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

app.post('/api/data', (req, res) => {
    const dataFromFrontend = req.body;
    console.log('Data received from front-end:', dataFromFrontend);

    // Process the data or send a response back to the front end
    res.json({ message: 'Data received successfully!' });
});

app.get('/api/data', (req, res) => {
    const responseData = { message: 'Hello from the backend!' };
    res.json(responseData);
});
