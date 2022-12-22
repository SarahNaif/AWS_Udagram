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
import { User } from '../models/User.js';
import * as c from '../../../../config/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import EmailValidator from 'email-validator';
const router = Router();
function generatePassword(plainTextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const salt = yield bcrypt.genSaltSync(saltRounds);
        return yield bcrypt.hash(plainTextPassword, salt);
    });
}
function comparePasswords(plainTextPassword, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(plainTextPassword, hash);
    });
}
function generateJWT(user) {
    return jwt.sign(user.short(), c.config.jwt.secret);
}
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
router.get('/verification', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ auth: true, message: 'Authenticated.' });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed.' });
    }
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required.' });
    }
    const user = yield User.findByPk(email);
    if (!user) {
        return res.status(401).send({ auth: false, message: 'User was not found..' });
    }
    const authValid = yield comparePasswords(password, user.passwordHash);
    if (!authValid) {
        return res.status(401).send({ auth: false, message: 'Password was invalid.' });
    }
    const jwt = generateJWT(user);
    res.status(200).send({ auth: true, token: jwt, user: user.short() });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is missing or malformed.' });
    }
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required.' });
    }
    const user = yield User.findByPk(email);
    if (user) {
        return res.status(422).send({ auth: false, message: 'User already exists.' });
    }
    const generatedHash = yield generatePassword(plainTextPassword);
    //@ts-ignore
    const newUser = yield new User({
        email: email,
        passwordHash: generatedHash,
    });
    const savedUser = yield newUser.save();
    const jwt = generateJWT(savedUser);
    res.status(201).send({ token: jwt, user: savedUser.short() });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('auth');
}));
export const AuthRouter = router;
//# sourceMappingURL=auth.router.js.map