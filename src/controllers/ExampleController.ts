import AbstractController from "./AbstractController";
import { HapRequest, HapResponse } from "../app/App";
import { User } from "../entities/User";
import { Connection } from "typeorm";
import { Container } from "typedi";


export default class ExampleController extends AbstractController {

    public async index(req: HapRequest, res: HapResponse) {
        res.status(200).send("done OK");
    }

    public async dbTest(req: HapRequest, res: HapResponse) {
        // const conn = Container.get("connection") as Connection;
        const userRepo = this.conn.getRepository(User);

        // const user: User = new User();
        // user.firstName = "rotem";
        // user.age = 32;
        // user.lastName = "grimberg";
        // await userRepo.save(user);

        const tmp = await userRepo.find({id: 1});
        console.log(tmp);
        res.status(200).json(tmp);
    }

    public async redisExample(req: HapRequest, res: HapResponse) {
        this.redis.set("test", "testValueFromRedis");
        const dataFromRedis = await this.redis.get("test");
        console.log(dataFromRedis);
        res.status(200).send("done OK");
    }
}
