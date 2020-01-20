import { Service } from "typedi";
import redis, { RedisClient } from "redis";

@Service()
export class Redis {
    client: RedisClient;

    constructor() {
        this.client = redis.createClient(8288, "localhost");
    }
}
