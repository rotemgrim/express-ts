import { Service } from "typedi";
import redis, { RedisClient } from "redis";
import { promisify } from "util";
import { redisConf } from "../config/config";

@Service()
export class Redis {

    public client: RedisClient;
    private readonly getAsync;

    constructor() {
        this.client = redis.createClient(redisConf.port, redisConf.host);
        this.getAsync = promisify(this.client.get).bind(this.client);
    }

    /**
     * get this key from redis
     * @param key
     */
    async get(key): Promise<any> {
        return await this.getAsync(key);
    }

    /**
     * set a key in redis storage
     * @param key
     * @param value
     * @param expirationMin - time to expiration in minutes
     */
    set(key: string, value: string, expirationMin?: number) {
        if (expirationMin) {
            this.client.set(key, value, "EX", expirationMin * 60);
        } else {
            this.client.set(key, value);
        }
    }
}
