const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

// GET route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, Vercel!');
});

// POST route to handle dynamic text input
app.post('/:text', (req, res) => {
    const inputText = req.params.text;
    res.json({
        message: `You sent: ${inputText}`
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
