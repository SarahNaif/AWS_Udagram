import {Router, Request, Response} from 'express';
import {FeedRouter} from './feed/routes/feed.router.js';
import {UserRouter} from './users/routes/user.router.js';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
