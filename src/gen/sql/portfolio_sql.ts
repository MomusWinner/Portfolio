import { Sql } from "postgres";

export const getSessionsByIDQuery = `-- name: GetSessionsByID :one
select s.id, ip, time_spent, created_at from portfolio.session s
where s.id = $1`;

export interface GetSessionsByIDArgs {
    id: string;
}

export interface GetSessionsByIDRow {
    id: string;
    ip: string;
    timeSpent: string;
    createdAt: Date;
}

export async function getSessionsByID(sql: Sql, args: GetSessionsByIDArgs): Promise<GetSessionsByIDRow | null> {
    const rows = await sql.unsafe(getSessionsByIDQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        ip: row[1],
        timeSpent: row[2],
        createdAt: row[3]
    };
}

