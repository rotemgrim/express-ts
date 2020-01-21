import { Service } from "typedi";
import logger from "../util/logger";
import { CronJob } from "cron";

@Service()
export class CronService {

    constructor() {
        this.start();
    }

    private start() {
        new CronJob("0 * * * * *", () => {
            // for every minute
            logger.info("This will log every round minute");
        }, undefined, true, "UTC");
    }

}
