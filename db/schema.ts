import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const contributions = sqliteTable('contributions', {
 id: text('id').primaryKey(), kind: text('kind').notNull(), promptId: text('prompt_id'),
 title: text('title').notNull(), category: text('category').notNull(), content: text('content').notNull(),
 reason: text('reason').notNull(), authorId: text('author_id').notNull(),
 createdAt: integer('created_at').notNull(), status: text('status').notNull().default('pending')
});
