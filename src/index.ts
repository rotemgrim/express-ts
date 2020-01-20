import App from "./app/App";
import { Container } from "typedi";
import { baseRoutes } from "./routes/baseRoutes";
import { GlobalMiddleware } from "./middlewares/GlobalMiddleware";
import { Redis } from "./services/Redis";

const server: App = Container.get(App);
Container.set("redis", new Redis());

server.setGlobalMiddleWares([
    GlobalMiddleware,
]);

server.setRoutes([
    baseRoutes,
]);

const app = server.start();

export default app;
