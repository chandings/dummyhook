const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());

let dataStore = {};
const getAllCountInLI = ()=>{
    returnValue = "<ul>";
    for (let key in dataStore) {
        returnValue +=`<li>key:${key}, count: ${dataStore[key]?dataStore[key].length:0}</li>` 
    }
    if(returnValue === "<ul>"){
        returnValue = "<p>No keys added yet!</p>"
    }else{
        returnValue+="</ul>"
    }
    return returnValue
}
// GET route for the root URL
app.get('/', (req, res) => {
    let htmlStr = `<h1>Dummy Hook</h1>
    <P>This site holds messages for any post! Apis:</p>
    <ul>
    <li>POST /[key]: This will save the json body </li>
    <li>GET /count, (header Data-key:[key]):This will give the number of requests held for the given [key]</li>
    <li>GET /dump-data, (header Data-key:[key]):This will return an array of requests held for the given key and empty the requests [key]</li>
    </ul>
    <h3>Current Keys held</h3>
    ${getAllCountInLI()}
    <p>Enjoy!</p>
    `
    res.send(htmlStr);
});

// POST route to handle dynamic text input
app.post('/:key', (req, res) => {
    const key = req.params.key;
    if (!dataStore[key]) dataStore[key] = [];
    dataStore[key].unshift({
        method: req.method,
        headers: req.headers,
        body: req.body,
        timestamp: new Date()
    });
    res.json({ message: `Data stored successfully for key: ${key}` });
});

app.get('/dump-data', (req, res) => {
    const key = req.header('Data-Key');
    console.log("key", key)
    if (!key) return res.status(400).json({ message: 'Data-Key header is required' });
    if (!dataStore[key]) return res.status(404).json({ message: `No data found for key: ${key}` });
    const data = dataStore[key];
    delete dataStore[key];
    res.status(200).json(data);
});

app.get('/count', (req, res) => {
    const key = req.header('Data-Key');
    console.log("key", key)
    if (!key) return res.status(400).json({ message: 'Data-Key header is required' });
    const count = dataStore[key] ? dataStore[key].length : 0;
    res.status(200).json({ key, count });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
