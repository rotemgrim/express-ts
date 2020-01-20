import express from "express";
import { IRouter } from "express-serve-static-core";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import DbFactory from "../config/DbFactory";
import { dbConf } from "../config/config";

export type HapRequest = express.Request;
export type HapResponse = express.Response;
export type HapMiddleware = (req: HapRequest, res: HapResponse, next: any) => Promise<void>;
export type RoutesBatch = (app: IRouter) => void;
export type App = express.Express;

export default class Application {

    private readonly app: App;
    private readonly middleWares: HapMiddleware[];
    private routeBatches: RoutesBatch[];

    public router: express.Router;

    constructor() {
        this.app = express();
        this.middleWares = [];
        this.routeBatches = [];
        this.router = express.Router();
    }

    public start() {

        DbFactory.createConnection(dbConf).catch(e => { throw new Error(e); });

        this.loadMiddleWares();

        this.app.set("port", process.env.PORT || 3000);
        // this.app.set("views", path.join(__dirname, "../views"));
        // this.app.set("view engine", "pug");
        this.app.use(compression());
        this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(expressValidator());

        this.app.use("/", this.router);
        this.loadRoutes();
        this.app.listen(this.app.get("port"), () => console.log(`Example app listening on port ${this.app.get("port")}!`));
        return this.app;
    }

    public setGlobalMiddleWares(middlewares: HapMiddleware[]) {
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

    private loadMiddleWares() {
        for (const middleware of this.middleWares) {
            this.app.use(middleware);
        }
    }
}
