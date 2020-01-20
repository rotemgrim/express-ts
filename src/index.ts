import App from "./app/App";
import { Container } from "typedi";
import { baseRoutes } from "./routes/baseRoutes";
import { GlobalMiddleware } from "./middlewares/GlobalMiddleware";

const server: App = Container.get(App);

server.setGlobalMiddleWares([
    GlobalMiddleware,
]);

server.setRoutes([
    baseRoutes,
]);

const app = server.start();

export default app;
