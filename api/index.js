const app = require('./server');  // Import your Express app
const { createServer } = require('@vercel/node');

module.exports = createServer(app);
