require('dotenv').config();

const Server = require('./models/server')
const server = new Server();

//Levantar el server
server.listen();


