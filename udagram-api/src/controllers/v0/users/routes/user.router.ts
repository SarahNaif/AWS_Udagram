import {Router, Request, Response} from 'express';

import {User} from '../models/User.js';
import {AuthRouter} from './auth.router.js';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/');

router.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params;
  const item = await User.findByPk(id);
  res.send(item);
});

export const UserRouter: Router = router;
