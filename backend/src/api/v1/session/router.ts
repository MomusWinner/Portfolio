import { AuthMiddleware, SessionMiddleware } from "../../../middleware/middleware";
import { SessionHandler } from "./handler";
import { Hono } from 'hono'

export function addSessionRoutes(sessionHandler: SessionHandler, authMiddleware: AuthMiddleware, sessionMiddleware: SessionMiddleware): Hono {
	const app = new Hono()

	app.post('/:tag', sessionMiddleware.handle(), (c) => { return c.json({ status: "success" }) })
	app.post('/', sessionMiddleware.handle(), (c) => { return c.json({ status: "success" }) })

	app.get('/:id', sessionHandler.getSessionByIdHandle())
	app.get('/', authMiddleware.handle(), sessionHandler.getAllSessionHandle())
	app.delete('/:id', authMiddleware.handle(), sessionHandler.deleteSessionByIdHandle())

	return app
}
