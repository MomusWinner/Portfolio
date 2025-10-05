import { Hono, Context } from 'hono'

export type App = Hono<{ Variables: Variables }>
export type AppContext = Context<{ Variables: Variables }>

export type Variables = {
	session: string
}
export function createApp(): App {
	return new Hono<{ Variables: Variables }>
}
