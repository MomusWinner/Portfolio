import { AuthMiddleware } from "../../../middleware/middleware";
import { TimeIntervalHandler } from "./handler";
import { Hono } from 'hono'

export function addTimeIntervalRoutes(timeIntervalHandle: TimeIntervalHandler, authMiddleware: AuthMiddleware): Hono {
	const app = new Hono()

	app.get('/', authMiddleware.handle(), timeIntervalHandle.getAllTimeIntervals())
	app.get('/:id', authMiddleware.handle(), timeIntervalHandle.getTimeIntervalByIDHandle())
	app.get('/session/:id/:date', authMiddleware.handle(), timeIntervalHandle.getTimeIntervalBySessionIDAndDayHandle())
	app.get('/session/:id', authMiddleware.handle(), timeIntervalHandle.getTimeIntervalBySessionIDHandle())
	app.delete('/:id', authMiddleware.handle(), timeIntervalHandle.deleteTimeIntervalByIDHandle())

	return app
}
