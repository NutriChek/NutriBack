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
    sqlChunks.push(sql`${key}::TEXT, TO_JSONB(${value})`);
  });

  return sql`JSONB_BUILD_OBJECT(${sql.join(sqlChunks, sql.raw(', '))})`;
}

export function jsonAgg(sqlChunk: SQLChunk, nullKey: SQLChunk) {
  return sql`COALESCE(JSONB_AGG(${sqlChunk}) FILTER (WHERE ${nullKey} IS NOT NULL), '[]'::jsonb)`;
}

export const userObject = jsonBuildObject({
  id: users.id,
  username: users.username,
  picture: users.picture
});

export function tsMatches(tsVector: SQLChunk, tsQuery: SQLChunk) {
  return sql`${tsVector} @@ TO_TSQUERY('english', ${tsQuery})`;
}

export function cardinality(array: SQLChunk) {
  return sql`CARDINALITY(${array})`;
}

export function coalesce(...props: SQLChunk[]) {
  return sql`COALESCE(${props[0]}, ${props[1]})`;
}
