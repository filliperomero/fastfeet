import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManagementController from './app/controllers/DeliveryManagementController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import ValidateSessionStore from './app/Validators/SessionStore';
import ValidateRecipientStore from './app/Validators/RecipientStore';
import ValidateRecipientUpdate from './app/Validators/RecipientUpdate';
import ValidateDeliveryManStore from './app/Validators/DeliveryManStore';
import ValidateDeliveryManUpdate from './app/Validators/DeliveryManUpdate';
import ValidateDeliveryStore from './app/Validators/DeliveryStore';
import ValidateDeliveryUpdate from './app/Validators/DeliveryUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/sessions', ValidateSessionStore, SessionController.store);

routes.get(
  '/deliveryman/:id/deliveries',
  DeliveryManagementController.showDeliveredPackages
);

routes.get('/deliveryman/:id/available', DeliveryManagementController.index);

routes.put(
  '/deliveryman/:deliverymanId/delivery/:deliveryId',
  DeliveryManagementController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemController.create);

// All routes below will be authenticated.
routes.use(authMiddleware);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', ValidateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  ValidateRecipientUpdate,
  RecipientController.update
);

routes.get('/deliveryman', DeliveryManController.index);
routes.get('/deliveryman/:id', DeliveryManController.indexSpecific);
routes.post(
  '/deliveryman',
  ValidateDeliveryManStore,
  DeliveryManController.store
);
routes.put(
  '/deliveryman/:id',
  ValidateDeliveryManUpdate,
  DeliveryManController.update
);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.indexSpecific);
routes.post('/deliveries', ValidateDeliveryStore, DeliveryController.store);
routes.put(
  '/deliveries/:id',
  ValidateDeliveryUpdate,
  DeliveryController.update
);
routes.delete('/deliveries/:id', DeliveryController.delete);

routes.get('/delivery/:id/problems', DeliveryProblemController.indexSpecific);
routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

export default routes;
