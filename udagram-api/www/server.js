var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dotenv from 'dotenv';
import cors from 'cors';
import express from "express";
import { sequelize } from "./sequelize.js";
import { IndexRouter } from "./controllers/v0/index.router.js";
import bodyParser from "body-parser";
import { V0_FEED_MODELS, V0_USER_MODELS } from "./controllers/v0/model.index.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    dotenv.config();
    try {
        yield sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    yield sequelize.addModels(V0_FEED_MODELS);
    yield sequelize.addModels(V0_USER_MODELS);
    yield sequelize.sync();
    console.log("Database Connected");
    const app = express();
    const port = 8080;
    app.use(bodyParser.json());
    // app.use(cors());
    // We set the CORS origin to * so that we don't need to
    // worry about the complexities of CORS. 
    // app.use(cors());
    app.use(cors({
        "allowedHeaders": [
            'Origin', 'X-Requested-With',
            'Content-Type', 'Accept',
            'X-Access-Token', 'Authorization', 'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Methods'
        ],
        "methods": 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        "preflightContinue": true,
        "origin": '*',
    }));
    app.use("/api/v0/", IndexRouter);
    // Root URI call
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("/api/v0/");
    }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // Start the Server
    app.listen(port, () => {
        console.log(`Backend server is listening on port ${port}....`);
        console.log(`Frontent server running ${process.env.URL}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map