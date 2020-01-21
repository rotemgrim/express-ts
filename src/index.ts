import App from "./app/App";
import { Container } from "typedi";
import { baseRoutes } from "./routes/baseRoutes";
import { GlobalMiddleware } from "./middlewares/GlobalMiddleware";
import DbFactory from "./config/DbFactory";
import { dbConf } from "./config/config";
import { RedisService } from "./services/RedisService";
import { CronService } from "./services/CronService";

const server: App = Container.get(App);

server.setGlobalMiddleWares([
    GlobalMiddleware,
]);

server.setRoutes([
    baseRoutes,
]);



(async () => {
    try {
        await DbFactory.createConnection(dbConf).catch(e => { throw new Error(e); });
        Container.set("redis", new RedisService());
        Container.set("cron", new CronService());
        server.start();
    } catch (e) {
        console.error(e);
        throw new Error("Oops! Something went wrong");
    }
})().catch(console.error);
