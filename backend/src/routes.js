import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import ValidateSessionStore from './app/Validators/SessionStore';
import ValidateRecipientStore from './app/Validators/RecipientStore';
import ValidateRecipientUpdate from './app/Validators/RecipientUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', ValidateSessionStore, SessionController.store);

// All routes below will be authenticated.
routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', ValidateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  ValidateRecipientUpdate,
  RecipientController.update
);

export default routes;
