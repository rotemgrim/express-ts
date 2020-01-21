import { Container } from "typedi";
import { RedisService } from "../services/RedisService";
import { Connection } from "typeorm";

export interface IController {

}

export default class AbstractController implements IController {

    private static redisService: RedisService;
    private static connection: Connection;

    protected static conn(): Connection {
        return AbstractController.connection ?
            AbstractController.connection : Container.get("connection") as Connection;
    }

    protected static redis(): RedisService {
        return AbstractController.redisService ?
            AbstractController.redisService : Container.get("redis") as RedisService;
    }
}
