const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

let dataStore = {};

// GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, Vercel!');
});

// POST route to handle dynamic text input
app.post('/:key', (req, res) => {
    const key = req.params.key;
    if (!dataStore[key]) dataStore[key] = [];
    dataStore[key].push({
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date()
    });
    res.json({ message: `Data stored successfully for key: ${key}` });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
