import { PGlite } from "@electric-sql/pglite";
import { PgDialect } from "drizzle-orm/pg-core/dialect";
import { drizzle } from "drizzle-orm/pglite";
import migrations from "./migration.json";
import * as schema from "./schema";

const doMigrate = async () => {
    const client = await PGlite.create({
        dataDir: `idb://accounting`,
    });

    const db = drizzle(client, {
        schema,
        logger: true,
    });

    try {
        const start = performance.now();

        // @ts-expect-error 🤷 don't know why db._.session is not a Session
        await new PgDialect().migrate(migrations, db._.session, "accounting");

        // @ts-expect-error 🤷 don't know why db._.session is not a Session
        await new PgDialect().migrate(migrations, db._.session, "accounting");


        // @ts-expect-error 🤷 don't know why db._.session is not a Session
        await new PgDialect().migrate(migrations, db._.session, "accounting");

        console.info(`✅ Local database ready in ${performance.now() - start}ms`);
    } catch (cause) {
        console.error("❌ Local database schema migration failed", cause);
        throw cause;
    }
}


export default doMigrate