import { RoutesBatch, App } from "../app/App";
import ExampleController from "../controllers/ExampleController";
import { exampleMiddleware } from "../middlewares/ExampleMiddleware";

const exampleController = new ExampleController();

export const baseRoutes: RoutesBatch = (app: App) => {
    app.get("/", [exampleMiddleware], exampleController.index);
    app.get("/db", exampleController.dbTest);
    app.get("/redisExample", exampleController.redisExample);
};
