const app = require('./server');          // Import your Express server app
const { createServer } = require('@vercel/node');  // Import Vercel's server creation helper

module.exports = createServer(app);       // Export the wrapped Express server
