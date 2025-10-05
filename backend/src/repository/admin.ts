import { PostgresError, Sql } from 'postgres';
import { CreateAdminRow, createAdmin, getAdminByID, deleteAdmin, getAllAdmins, getAdminByEmail } from './../gen/sql/portfolio_sql'
import { RepositoryError, processError } from './errors'

interface Admin {
	id: string;
	email: string;
	password: string;
	createdAt: Date;
}

export class AdminRepository {
	sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async createAdmin(email: string, password: string): Promise<[Admin | null, RepositoryError]> {
		const rError: RepositoryError = RepositoryError.None;
		var admin: CreateAdminRow | null;
		try {
			admin = await createAdmin(this.sql, { email: email, password: password });
		}
		catch (error: unknown) {
			return [null, processError(error)];
		}
		return [admin, RepositoryError.None];
	}

	async getAdminByID(id: string): Promise<Admin | null> {
		let admin = await getAdminByID(this.sql, { id: id });
		return admin;
	}

	async getAdminByEmail(email: string): Promise<Admin | null> {
		let admin = await getAdminByEmail(this.sql, { email: email });
		return admin;
	}

	async getAllAdmin(): Promise<Admin[]> {
		return getAllAdmins(this.sql);
	}

	async deleteAdmin(id: string) {
		await deleteAdmin(this.sql, { id: id });
	}
}

export { RepositoryError };
