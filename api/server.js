const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let dataStore = {};  // In-memory storage

// Define routes
app.post('/:key', (req, res) => {
    const key = req.params.key;
    if (!dataStore[key]) dataStore[key] = [];
    dataStore[key].push({
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date()
    });
    res.status(200).json({ message: `Data stored successfully for key: ${key}` });
});

app.get('/dump-data', (req, res) => {
    const key = req.header('Data-Key');
    if (!key) return res.status(400).json({ message: 'Data-Key header is required' });
    if (!dataStore[key]) return res.status(404).json({ message: `No data found for key: ${key}` });
    const data = dataStore[key];
    delete dataStore[key];
    res.status(200).json(data);
});

app.get('/count', (req, res) => {
    const key = req.header('Data-Key');
    if (!key) return res.status(400).json({ message: 'Data-Key header is required' });
    const count = dataStore[key] ? dataStore[key].length : 0;
    res.status(200).json({ key, count });
});

module.exports = app;  // Export the Express app
