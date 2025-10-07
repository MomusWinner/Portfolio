import { Sql } from "postgres";
import {
  createTimeInterval,
  getTimeIntervalsBySessionID,
  getTimeIntervalByID,
  getAllTimeIntervals,
  deleteTimeInterval,
  getTimeIntervalsBySessionIDAndDay,
  createAlias,
  getAllAliases,
  deleteAlias,
} from "@/gen/sql/portfolio_sql";
import { RepositoryError, processError, catchError } from "./errors";

interface TimeInterval {
  id: string;
  sessionId: string;
  tStart: Date;
  tEnd: Date;
}

interface Alias {
  id: string;
  tag: string;
  alias: string;
}

export class AnaliticsRepository {
  sql: Sql;

  constructor(sql: Sql) {
    this.sql = sql;
  }

  async createTimeInterval(
    sessionId: string,
    start: Date,
    end: Date
  ): Promise<TimeInterval | null> {
    let interval = await createTimeInterval(this.sql, {
      sessionId: sessionId,
      tStart: start,
      tEnd: end,
    });
    return interval;
  }

  async getTimeIntervalByID(id: string): Promise<TimeInterval | null> {
    let interval = await getTimeIntervalByID(this.sql, { id: id });
    return interval;
  }

  async getTimeIntervalsBySessionID(sessionId: string): Promise<TimeInterval[]> {
    let interval = await getTimeIntervalsBySessionID(this.sql, { sessionId: sessionId });
    return interval;
  }

  async getTimeIntervalsBySessionIDAndDady(sessionId: string, day: Date): Promise<TimeInterval[]> {
    let interval = await getTimeIntervalsBySessionIDAndDay(this.sql, { sessionId, tStart: day });
    return interval;
  }

  async getAllTimeIntervals(): Promise<TimeInterval[]> {
    return getAllTimeIntervals(this.sql);
  }

  async deleteTimeInterval(id: string): Promise<void> {
    await deleteTimeInterval(this.sql, { id: id });
  }

  async createAlias(tag: string, alias: string): Promise<[Alias | null, RepositoryError]> {
    return catchError(() => createAlias(this.sql, { tag: tag, alias: alias }));
  }

  async getAllAliases(): Promise<Alias[]> {
    return getAllAliases(this.sql);
  }

  async deleteAliase(id: string): Promise<void> {
    return deleteAlias(this.sql, { id: id });
  }
}
