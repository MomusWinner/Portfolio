export interface Config {
	dbHost: string,
	dbName: string,
	dbPort: number,
	dbUsername: string,
	dbPassword: string,
	dbSsl: boolean,
	tokenLifeTime: number,
	jwtPublicKey: string,
	jwtPrivateKey: string,
	adminEmail: string,
	adminPassword: string,
}

export function load_config(): Config {
	return {
		dbHost: Bun.env.DB_HOST ?? "null",
		dbName: Bun.env.DB_NAME ?? "null",
		dbPort: Number(Bun.env.DB_PORT),
		dbUsername: Bun.env.DB_USER ?? "null",
		dbPassword: Bun.env.DB_PASS ?? "null",
		dbSsl: Boolean(Bun.env.DB_SSL),
		tokenLifeTime: Number(Bun.env.TOKEN_LIFETIME),
		jwtPublicKey: Bun.env.JWT_PUBLIC_KEY ?? "null",
		jwtPrivateKey: Bun.env.JWT_PUBLIC_KEY ?? "null",
		adminEmail: Bun.env.ADMIN_EMAIL ?? "null",
		adminPassword: Bun.env.ADMIN_PASS ?? "null",
	}
}
