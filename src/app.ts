import express, { Express } from 'express';

import mongoose from 'mongoose';

import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.connectToMongo();
  }

  middlewares() {
    this.server.use(express.json());
  }

  connectToMongo() {
    if(process.env.CI){
      mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0-4hmfs.mongodb.net/test?retryWrites=true&w=majority`, {  
        autoIndex: false,
        autoReconnect: false,
        connectTimeoutMS: 10000,
        useNewUrlParser: true 
      })
        .catch( error => console.log(error));
    }else {
      mongoose.connect('mongodb://db:27017/VUTTR', {  
        autoIndex: false,
        autoReconnect: false,
        connectTimeoutMS: 10000,
        useNewUrlParser: true 
      })
        .catch( error => console.log(error));
    }
   
  }

  routes() {
    this.server.use(routes);
  }

}

export default new App().server;