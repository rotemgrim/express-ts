
import { createConnection, ConnectionOptions, useContainer } from "typeorm";
import { Container } from "typedi";
import { User } from "../entities/User";

export default class DbFactory {

    private static connectionOptions = {
        entities: [
            User,
            // __dirname + "./entities/*.ts"
        ],
        synchronize: true,
    };

    public static createConnection(options: ConnectionOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            options = Object.assign(DbFactory.connectionOptions, options);
            useContainer(Container);
            createConnection(options).then((conn) => {
                Container.set("connection", conn);
                console.info("db connection made");
                resolve();
            }).catch(e => {
                console.error("could not connect to DB", e);
                reject();
            });
        });
    }
}
