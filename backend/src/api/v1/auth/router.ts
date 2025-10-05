import { AuthHandler } from "./handler";
import { Hono } from 'hono'


export function addAuthRoutes(authHandler: AuthHandler): Hono {
	const app = new Hono()

	// app.use("*", jwt({ secret: 'mega-secret' }))

	app.post("/register", authHandler.registerHandle());
	app.post("/signin", authHandler.signinHandle());
	// app.get('/:id', authHandler.getAdminByIdHandle());
	// app.get('/', authHandler.getAllAdminsHandle());
	// app.delete('/:id', authHandler.deleteAdminHandle());

	return app;
}

