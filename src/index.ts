import HaploApp from "./app/App";
import { Container } from "typedi";

import { exampleMiddleware } from "./middlewares/ExampleMiddleware";
import { baseRoutes } from "./routes/baseRoutes";

const haplo: HaploApp = Container.get(HaploApp);

haplo.setGlobalMiddlewares([
    exampleMiddleware,
]);

haplo.setRoutes([
    baseRoutes,
]);

const app = haplo.start();

export default app;