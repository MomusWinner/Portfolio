import { Context } from "hono";
import { SessionRepository } from "@/repository/session";

export class SessionHandler {
  sessionR: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionR = sessionRepository;
  }

  getAllSessionHandle() {
    return async (c: Context) => {
      let r = await this.sessionR.getAllSession();
      console.log(r);
      return c.json(r);
    };
  }

  getSessionByIdHandle() {
    return async (c: Context) => {
      const id = c.req.param("id");
      const r = await this.sessionR.getSessionByID(id);
      if (r === null) {
        return c.notFound();
      }
      return c.json(r);
    };
  }

  deleteSessionByIdHandle() {
    return async (c: Context) => {
      const id = c.req.param("id");
      await this.sessionR.deleteSession(id);
      return c.json({ status: "success" });
    };
  }
}
