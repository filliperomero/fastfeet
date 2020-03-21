import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import ValidateSessionStore from './app/Validators/SessionStore';

const routes = new Router();

routes.post('/sessions', ValidateSessionStore, SessionController.store);

export default routes;
