import express from "express";
import { IRouter } from "express-serve-static-core";
import Container from "typedi";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import * as http from "http";

export type HaploRequest = express.Request;
export type HaploResponse = express.Response;
export type HaploMiddleware = (req: HaploRequest, res: HaploResponse) => Promise<void>;
export type HaploRoute = () => IRouter;
export type RoutesBatch = (app: IRouter) => void;
export type App = express.Express;

export default class HaploApp {

    private app: App;
    private middleWares: HaploMiddleware[];
    private routeBatches: RoutesBatch[];

    public router: express.Router;

    constructor() {
        this.app = express();
        this.middleWares = [];
        this.routeBatches = [];
        this.router = express.Router();
    }

    public start() {
        this.loadMiddlewares();
        
        this.app.set("port", process.env.PORT || 3000);
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        this.app.use(compression());
        this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(expressValidator());

        this.app.use('/', this.router);
        this.loadRoutes();
        this.app.listen(this.app.get("port"), () => console.log(`Example app listening on port ${this.app.get("port")}!`));
        return this.app;
    }

    public setGlobalMiddlewares(middlewares: HaploMiddleware[]) {
        for (const middleware of middlewares) {
            this.middleWares.push(middleware);
        }
    }

    public setRoutes(routesBatches: Array<(app: App) => void>) {
        this.routeBatches = routesBatches;
    }

    private loadRoutes() {
        for (const batch of this.routeBatches) {
            batch(this.app);
        }
    }

    private loadMiddlewares() {
        for (const middleware of this.middleWares) {
            this.router.use(async (req, res, next) => {
                await middleware(req, res);
                next();
            });
        }
    }
}