import App from "./app/App";
import { Container } from "typedi";
import { exampleMiddleware } from "./middlewares/ExampleMiddleware";
import { baseRoutes } from "./routes/baseRoutes";
import { config } from "./config/config";
import DBConnection from "./config/dbConnection";

Container.set("config", config);

DBConnection.connect(config.)

const server: App = Container.get(App);

server.setGlobalMiddlewares([
    exampleMiddleware,
]);

server.setRoutes([
    baseRoutes,
]);

const app = server.start();

export default app;