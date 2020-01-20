import { RoutesBatch, App } from "../app/App";
import ExampleController from "../controllers/ExampleController";
import { exampleMiddleware } from "../middlewares/ExampleMiddleware";

export const baseRoutes: RoutesBatch = (app: App) => {
    app.get("/", [exampleMiddleware], ExampleController.index);
    app.get("/db", ExampleController.dbTest);
    app.get("/redis", ExampleController.redisExample);
};
