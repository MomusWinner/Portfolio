import { Context } from 'hono'
import { AnaliticsRepository } from '../../../repository/analitics';


export class TimeIntervalHandler {
	analiticsR: AnaliticsRepository;

	constructor(analiticsR: AnaliticsRepository) {
		this.analiticsR = analiticsR;
	}

	getAllTimeIntervals() {
		return async (c: Context) => {
			let r = await this.analiticsR.getAllTimeIntervals()

			return c.json(r);
		}
	}

	getTimeIntervalByIDHandle() {
		return async (c: Context) => {
			let r = await this.analiticsR.getTimeIntervalByID(c.req.param('id'))
			if (r === null) { return c.notFound() }

			return c.json(r);
		}
	}

	getTimeIntervalBySessionIDHandle() {
		return async (c: Context) => {
			let r = await this.analiticsR.getTimeIntervalsBySessionID(c.req.param('id'))

			return c.json(r);
		}
	}

	getTimeIntervalBySessionIDAndDayHandle() {
		return async (c: Context) => {
			const id = c.req.param('id');
			const date = new Date(c.req.param('date'));
			const r = await this.analiticsR.getTimeIntervalsBySessionIDAndDady(id, date);

			return c.json(r);
		}
	}

	deleteTimeIntervalByIDHandle() {
		return async (c: Context) => {
			const id = c.req.param('id');
			await this.analiticsR.deleteTimeInterval(id);

			return c.json({ status: "success" });
		}
	}
}
