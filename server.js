const server = require('http');
let port = process.env.PORT || 3000;

const app = require('./config/app');

server.createServer(app).listen(port, () => {
	console.log('Server listening on port 3000!');
});