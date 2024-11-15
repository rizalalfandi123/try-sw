import { PGlite } from "@electric-sql/pglite";
import { drizzle,  } from "drizzle-orm/pglite";
import * as schema from "./schema";

const initDb = async () => {
    const client = await PGlite.create({
        dataDir: `idb://accounting`,
    });

    const db = drizzle(client, {
        schema,
        logger: true,
    });

    return db
}


export default initDb