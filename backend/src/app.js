import express from 'express';
import cors from 'cors';
import http from 'http';

import routes from './routes';
import { setupWebSocket } from './websocket';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    setupWebSocket(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
