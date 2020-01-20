import { Container } from "typedi";
import { Redis } from "../services/Redis";
import { Connection } from "typeorm";

export interface IController {

}

export default class AbstractController implements IController {

    private static redisService: Redis;
    private static connection: Connection;

    protected static conn(): Connection {
        return AbstractController.connection ?
            AbstractController.connection : Container.get("connection") as Connection;
    }

    protected static redis(): Redis {
        return AbstractController.redisService ?
            AbstractController.redisService : Container.get("redis") as Redis;
    }
}
