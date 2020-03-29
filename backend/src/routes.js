import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';

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
routes.post('/deliveries', ValidateDeliveryStore, DeliveryController.store);
routes.put(
  '/deliveries/:id',
  ValidateDeliveryUpdate,
  DeliveryController.update
);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
