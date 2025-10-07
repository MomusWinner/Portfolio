import { logger } from 'hono/logger'
import { Fronted } from './frontend/index'
import { load_config, Config } from './config'
import { connect } from './repository/connection'
import { SessionRepository } from './repository/session'
import { AdminRepository } from './repository/admin'
import { AuthMiddleware, SessionMiddleware } from './middleware/middleware'
import { SessionHandler } from './api/v1/session/handler'
import { addSessionRoutes } from './api/v1/session/router'
import { AuthHandler } from './api/v1/auth/handler'
import { addAuthRoutes } from './api/v1/auth/router'
import { websocket } from 'hono/bun'
import { AnaliticsHandler } from './api/v1/analitics/handler'
import { addAnalicitcsRoutes } from './api/v1/analitics/router'
import { AnaliticsRepository } from './repository/analitics'
import { createApp } from './factory'
import { TimeIntervalHandler } from './api/v1/timeInterval/handler'
import { addTimeIntervalRoutes } from './api/v1/timeInterval/router'
import { AliasHandler } from './api/v1/alias/handler'
import { addAliasRoutes } from './api/v1/alias/router'


const app = createApp()

var config: Config = load_config()
console.log(config)

const sql = connect(config)

const sessionRepo = new SessionRepository(sql)
const sesssionHandler = new SessionHandler(sessionRepo)
const sessionMiddleware = new SessionMiddleware(sessionRepo)

const adminRepo = new AdminRepository(sql);
const authHandler = new AuthHandler(config, adminRepo);
const authMiddleware = new AuthMiddleware(config);

const analiticsRepo = new AnaliticsRepository(sql)
const analitics = new AnaliticsHandler(analiticsRepo)

const timeIntervalHander = new TimeIntervalHandler(analiticsRepo)

const aliasHandler = new AliasHandler(analiticsRepo)

app.use(logger());
app.route('/api/v1/session', addSessionRoutes(sesssionHandler, authMiddleware, sessionMiddleware))
app.route('/api/v1/auth', addAuthRoutes(authHandler));
app.route('/api/v1/analitics', addAnalicitcsRoutes(analitics, sessionMiddleware))
app.route('/api/v1/time_interval', addTimeIntervalRoutes(timeIntervalHander, authMiddleware))
app.route('/api/v1/alias', addAliasRoutes(aliasHandler, authMiddleware))

export default {
	port: 4000,
	fetch: app.fetch,
	websocket
} 
