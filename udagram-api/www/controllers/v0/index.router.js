var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { FeedRouter } from './feed/routes/feed.router.js';
import { UserRouter } from './users/routes/user.router.js';
const router = Router();
router.use('/feed', FeedRouter);
router.use('/users', UserRouter);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`V0`);
}));
export const IndexRouter = router;
//# sourceMappingURL=index.router.js.map