import { Service } from "typedi";
import redis, { RedisClient } from "redis";
import {promisify} from 'util';

@Service()
export class Redis {
    client: RedisClient;
    getAsync;

    constructor() {
        this.client = redis.createClient(8288, "localhost");
        this.getAsync = promisify(this.client.get).bind(this.client);
    }

    async get(key): Promise<any> {
        return await this.getAsync(key);
    }
}
