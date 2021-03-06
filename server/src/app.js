import './bootstrap';

import express from 'express';
import cors from 'cors';
import Routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(Routes);
  }
}

export default new App().server;
