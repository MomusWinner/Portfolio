import { Context } from 'hono'
import { websocket, upgradeWebSocket } from 'hono/bun'
import { AnaliticsRepository } from '../../../repository/analitics';
import { AppContext } from '../../../factory';

export class AnaliticsHandler {
	analiticsR: AnaliticsRepository;

	constructor(analiticsR: AnaliticsRepository) {
		this.analiticsR = analiticsR
	}

	getAnaliticsWebSocket() {
		return upgradeWebSocket((c: AppContext) => {
			var success: Boolean = true
			var startTime: Date = new Date()
			var sessionId: string = c.get('session')

			return {
				onMessage(ws_event, ws) {
					console.log(`Message from client: ${ws_event.data}`)
					var event
					try {
						event = JSON.parse(ws_event.data.toString())
					}
					catch {
						ws.send('Incorrect message')
						success = false
						return
					}

					ws.send(event + '\nHello from server!' + event?.event)
				},
				onClose: () => {
					if (success) {
						this.analiticsR.createTimeInterval(sessionId, startTime, new Date())
					}
					console.log('Connection closed')
				},
			}
		})
	}
}
