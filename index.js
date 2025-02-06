const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

let dataStore = {};
const getAllCountInLI = ()=>{
    returnValue = "";
    for (let key in dataStore) {
        returnValue +=`<li>key:${key}, count: ${dataStore[key]?dataStore[key].length:0}</li>` 
    }
    return returnValue
}
// GET route for the root URL
app.get('/', (req, res) => {
    let htmlStr = `<h1>Dummy Hook</h1>
    <P>This site holds messages for any post! Apis:</p>
    <ul>
    <li>POST /<key>: This will save the json body</li>
    <li>GET /count, [header Data-key:<key>]:This will give the number of requests held for the given <key></li>
    <li>GET /dump-data, [header Data-key:<key>]:This will return an array of requests held for the given key and empty the requests <key></li>
    </ul>
    <h3>Current Keys held</h3>
    <ul>${getAllCountInLI()}</ul>
    <p>Enjoy!</p>
    `
    res.send(htmlStr);
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
