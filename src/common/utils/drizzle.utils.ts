import { AnyColumn, SQL, sql, SQLChunk } from 'drizzle-orm';
import { users } from '@db/users';

export function random() {
  return sql`RANDOM()`;
}

export function increment(column: AnyColumn, value: number) {
  return sql`${column} + ${value}`;
}

export function decrement(column: AnyColumn, value: number) {
  return sql`${column} - ${value}`;
}

export async function firstRow<T>(
  promise: Promise<T[]>
): Promise<T | undefined> {
  return (await promise)[0];
}

export function jsonBuildObject(obj: Record<string, SQLChunk>) {
  const sqlChunks: SQL[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    sqlChunks.push(sql`${key}::TEXT, TO_JSONB(${value}::TEXT)`);
  });

  return sql`JSONB_BUILD_OBJECT(${sql.join(sqlChunks, sql.raw(', '))})`;
}

export function jsonAgg(sqlChunk: SQLChunk) {
  return sql`JSONB_AGG(${sqlChunk})`;
}

export const userObject = jsonBuildObject({
  id: users.id,
  username: users.username,
  picture: users.picture
});

export function tsMatches(tsVector: SQLChunk, tsQuery: SQLChunk) {
  return sql`${tsVector} @@ to_tsquery('english', ${tsQuery})`;
}

export function cardinality(array: SQLChunk) {
  return sql`cardinality(${array})`;
}
