import AbstractController from "./AbstractController";
import HaploApp, { HaploRequest, HaploResponse } from "../app/App";
import { User } from "../entities/User";
import { getConnectionManager, Connection, getFromContainer } from "typeorm";
import { Container, Service } from "typedi";
import { InjectConnection } from "typeorm-typedi-extensions";


export default class ExampleController extends AbstractController {

    public static index(req: HaploRequest, res: HaploResponse) {
        res.status(200).send("done OK");
        // res.send("asd3 - " + Date.now());
    }

    public static async dbTest(req: HaploRequest, res: HaploResponse) {
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