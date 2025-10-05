import type { FC } from 'hono/jsx'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Layout } from './layout'
import { css, cx, keyframes, Style } from 'hono/css'
import { Portfolio } from './portfolio/index'
import { Admin } from './admin/index'
import { html, raw } from 'hono/html'
import { env } from 'hono/adapter'
import { SessionRepository } from '../repository/session'
import { backgroundColor } from "./baseStyle"
import { MiddlewareHandler } from 'hono'
import { proxy } from 'hono/proxy'
import { App, createApp } from '../factory'

export class Fronted {
	userMiddleware: MiddlewareHandler
	adminMiddleware: MiddlewareHandler

	constructor(userMiddleware: MiddlewareHandler, adminMiddleware: MiddlewareHandler) {
		this.userMiddleware = userMiddleware
		this.adminMiddleware = adminMiddleware
	}

	getApp(): App {
		const app = createApp()

		// app.use('/static/*', serveStatic({ root: './' }))
		// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
		app.get("/test", this.userMiddleware, async (c) => {
			console.log("------------------------------")
			return c.text("test")
		})


		app.get("/", this.userMiddleware, async (c) => {
			// return c.render(<Portfolio />)
			//
			console.log("------------------------------")
			const path = c.req.path.replace(/^\/proxy/, '')
			const targetUrl = `http://frontend:3000${path}${c.req.url.includes('?') ? '?' + c.req.url.split('?')[1] : ''}`
			console.log(targetUrl)
			var response = await proxy(targetUrl)
			var sessionId = c.get('session');

			// const payload = c.get('');
			response.headers.append("Set-Cookie", "session=" + sessionId)
			return response
			// var result = await fetch("http://frontend:3000/", {
			// 	method: c.req.method,
			// 	headers: c.req.raw.headers,
			// })
			//
			// return c.html(result.body.)
			//
			// return proxy(`http://frontend:3000/${c.req.param('path')}`)
		})


		// app.use('*', async (c, next) => {
		// 	c.setRenderer((content) => {
		// 		return c.html(
		// 			<>
		// 				{html`<!DOCTYPE html>`}
		// 				<html>
		// 					<head>
		// 						<link rel="preconnect" href="https://fonts.googleapis.com" />
		// 						<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin='' />
		// 						<noscript>
		// 							<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />
		// 						</noscript>
		// 						<title>Areg Krdyan</title>
		// 						<Style />
		// 					</head>
		// 					<body class={backgroundColor}>
		// 						<Layout>
		// 							{content}
		// 						</Layout>
		// 					</body>
		// 				</html>
		// 			</>
		// 		)
		// 	})
		// 	await next()
		// })
		//
		// app.get("/", (c) => {
		// 	return c.render(<Portfolio />)
		// })
		//
		// app.get("/admin", (c) => {
		// 	return c.render(<Admin />)
		// })

		return app
	}
}
