import { Router } from 'express';

import DevController from './app/controllers/DevController';

const routes = Router();

routes.post('/devs', DevController.store);

export default routes;
