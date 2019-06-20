import AbstractController from "./AbstractController";
import HaploApp, { HaploRequest, HaploResponse } from "../app/App";

export default class ExampleController extends AbstractController {

    public static index(req: HaploRequest, res: HaploResponse) {
        res.status(200).send("done OK");
        // res.send("asd3 - " + Date.now());
    }
}