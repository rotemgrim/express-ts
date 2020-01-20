import { Inject } from "typedi";
import { Redis } from "../services/Redis";
import { Connection } from "typeorm";

export interface IController {

}

export default class AbstractController implements IController {

    @Inject("redis")
    protected redis: Redis;

    @Inject("connection")
    protected conn: Connection;

    // protected req: HapRequest;
    // protected res: HapResponse;
    //
    // constructor(
    //     req: HapRequest,
    //     res: HapResponse,
    // ) {
    //     this.req = req;
    //     this.res = res;
    // }

}
