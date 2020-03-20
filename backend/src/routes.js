import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'hello from my world :) ' });
});

export default routes;
