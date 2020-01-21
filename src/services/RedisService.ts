import { Service } from "typedi";
import redis, { RedisClient } from "redis";
import { promisify } from "util";
import { redisConf } from "../config/config";
import logger from "../util/logger";

@Service()
export class RedisService {

    public client: RedisClient;
    private getAsync;
    private readonly redisConf;

    constructor() {
        this.redisConf = redisConf;
        this.client = redis.createClient(this.redisConf.port, this.redisConf.host);
        this.client.on("error", (e) => {
            logger.error("could not instantiate redis service");
            this.getAsync = async (key) => logger.error(`redis is not connected you can't get ${key}`);
        });
        this.client.on("connect", () => {
            this.getAsync = promisify(this.client.get).bind(this.client);
        });
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
    set(key: string, value: string, expirationMin?: number): void {
        if (!this.client.connected) {
            logger.error(`could not set ${key} in redis, redis is not connected`);
            return;
        }

        try {
            if (expirationMin) {
                this.client.set(key, value, "EX", expirationMin * 60);
            } else {
                this.client.set(key, value);
            }
        } catch (e) {
            logger.error(`could not set ${key} in redis`, e);
        }
    }
}
