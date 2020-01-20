import AbstractController from "./AbstractController";
import { HapRequest, HapResponse } from "../app/App";
import { User } from "../entities/User";
import { Connection } from "typeorm";
import { Container } from "typedi";
import logger from "../util/logger";
import { Redis } from "../services/Redis";


export default class ExampleController extends AbstractController {

    public static async index(req: HapRequest, res: HapResponse) {
        const redis: Redis = Container.get("redis");

        logger.info("test", {some: "sdsdsd", redisKey: await redis.get("test")});

        res.status(200).send("done OK");
        // res.send("asd3 - " + Date.now());
    }

    public static async dbTest(req: HapRequest, res: HapResponse) {
        // const conn = Container.get(Connection);
        const conn = Container.get("connection") as Connection;
        // const conn = getFromContainer(Connection);
        const userRepo = conn.getRepository(User);
        // const userRepo = this.connection.getRepository(User);


        // const user: User = new User();
        // user.firstName = "rotem";
        // user.age = 32;
        // user.lastName = "grimberg";
        // await userRepo.save(user);

        const tmp = await userRepo.find({id: 1});
        console.log(tmp);
        res.status(200).json(tmp);
    }
}
