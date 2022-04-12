import { Router } from 'express';

import ContainerController from './app/controllers/ContainerController';
import MovementController from './app/controllers/MovementController';
import ReportController from './app/controllers/ReportController';

const routes = new Router();

routes.get('/containers/current', ContainerController.show);
routes.get('/containers', ContainerController.index);
routes.post('/containers', ContainerController.create);
routes.put('/containers/:id', ContainerController.update);
routes.delete('/containers/:id', ContainerController.delete);

routes.get('/movements/current', MovementController.show);
routes.get('/movements', MovementController.index);
routes.post('/movements', MovementController.create);
routes.put('/movements/:id', MovementController.update);
routes.delete('/movements/:id', MovementController.delete);

routes.get('/report', ReportController.show);
routes.get('/report/pdf', ReportController.index);

export default routes;
