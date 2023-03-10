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
import { FeedItem } from '../models/FeedItem.js';
import jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws.js';
import * as c from '../../../../config/config.js';
const router = Router();
export function requireAuth(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({ message: 'Malformed token.' });
    }
    const token = tokenBearer[1];
    return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}
// Get all feed items
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
}));
// Get a feed resource
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield FeedItem.findByPk(id);
    res.send(item);
}));
// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url: url });
}));
// Create feed with metadata
router.post('/', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caption = req.body.caption;
    const fileName = req.body.url; // same as S3 key name
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed.' });
    }
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required.' });
    }
    //@ts-ignore
    const item = yield new FeedItem({
        caption: caption,
        url: fileName,
    });
    const savedItem = yield item.save();
    savedItem.url = AWS.getGetSignedUrl(savedItem.url);
    res.status(201).send(savedItem);
}));
export const FeedRouter = router;
//# sourceMappingURL=feed.router.js.map