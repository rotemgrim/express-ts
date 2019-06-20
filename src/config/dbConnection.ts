


export default class DBConnection {

    public static async connect() {
        return new Promise(async (resolve, reject) => {
            const config = AppGlobal.getConfig();
            if (config.dbPath) {
                await createConnection({
                    name: "reading",
                    type: "sqlite",
                    database: path.join(config.dbPath, "database.sqlite"),
                    entities: [
                        Alias,
                        User,
                        MediaFile,
                        MetaData,
                        Episode,
                        UserMetaData,
                        UserEpisode,
                        Genre,
                        TorrentFile,
                    ],
                    synchronize: true,
                }).then(() => {
                    console.info("db connection made");
                    resolve();
                }).catch(e => {
                    console.error("could not connect to DB", e);
                    reject();
                });
            } else {
                console.error("could not connect to DB - there was no DB path provided");
                reject();
            }
        });
    }
}