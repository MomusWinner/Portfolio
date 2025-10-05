import { AuthMiddleware } from "../../../middleware/middleware";
import { AliasHandler } from "./handler";
import { Hono } from 'hono'

export function addAliasRoutes(aliasHandler: AliasHandler, authMiddleware: AuthMiddleware): Hono {
	const app = new Hono()

	app.get('/', authMiddleware.handle(), aliasHandler.getAllAliases())
	app.post('/', authMiddleware.handle(), aliasHandler.createAlias())
	app.delete('/:id', authMiddleware.handle(), aliasHandler.deleteAliasByIDHandle())

	return app
}
