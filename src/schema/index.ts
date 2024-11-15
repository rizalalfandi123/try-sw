import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
});
