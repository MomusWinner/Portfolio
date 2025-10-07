import { Sql } from 'postgres';
import { createSession, getSessionsByID, deleteSession, getAllSessions } from './../gen/sql/portfolio_sql'

interface Session {
	id: string;
	tag: string | null;
	ip: string;
	device: string;
	createdAt: Date;
	alias?: string | null;
	totalTime?: string | null;
}

export class SessionRepository {
	sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async createSession(ip: string, device: string, tag: string | null): Promise<Session | null> {
		let session = await createSession(this.sql, { ip: ip, tag: tag, device });
		return session;
	}

	async getSessionByID(id: string): Promise<Session | null> {
		let session = await getSessionsByID(this.sql, { id: id });
		return session;
	}

	async getAllSession(): Promise<Session[]> {
		return getAllSessions(this.sql)
	}

	async deleteSession(id: string) {
		await deleteSession(this.sql, { id: id })
	}
}
