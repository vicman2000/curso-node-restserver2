const express = require("express");
const cors = require('cors');
const { dbConnect } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    //Connect to DataBase
    this.connectDb();

    //Middlewares -- Aplicaciones que se ejecutan cuando se levanta el servidor
    this.middlewares();

    //Rutas del APP
    this.routes();
  }

  async connectDb() {
    await dbConnect();
  }

  
  middlewares() {
    // Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }


  routes() {
    this.app.use(this.authPath, require("../src/routes/auth.route"));
    this.app.use(this.usuariosPath, require("../src/routes/usuarios.route"));
  }

  
  
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto:${this.port}`);
    });
  }
}

module.exports = Server;
