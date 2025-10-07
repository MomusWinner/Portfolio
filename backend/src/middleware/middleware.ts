import { Hono, Next, Context, MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { SessionRepository } from "@/repository/session";
import { InternalServerError } from "@/helpers/helper";
import { Config } from "@/config";
import { jwt } from "hono/jwt";
import { AlgorithmTypes } from "hono/utils/jwt/jwa";

export class SessionMiddleware {
  sessionR: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionR = sessionRepository;
  }

  use(app: Hono, path: string = "*") {
    app.use(path, this.handle());
  }

  handle(): MiddlewareHandler {
    return async (c: Context, next: Next) => {
      console.log("session middleware");
      var sessionId = getCookie(c, "session");
      var tag: string | null = !c.req.param("tag") ? null : c.req.param("tag");

      console.log("id: " + sessionId);
      if (sessionId === undefined) {
        console.log("session id is undefined");
        sessionId = await this.createNewSession(c, tag);
      } else {
        const session = await this.sessionR.getSessionByID(sessionId);
        if (session === null) {
          console.log("Couldn't finde session in db");
          sessionId = await this.createNewSession(c, tag);
        } else {
          console.log("Get exist session with id: " + session?.id);
          sessionId = session.id;
        }
      }

      c.set("session", sessionId);

      await next();
    };
  }

  async createNewSession(c: Context, tag: string | null): Promise<string> {
    const request = c.req.raw;
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    const userAgent = c.req.header("user-agent") || "";

    const session = await this.sessionR.createSession(ip, userAgent, tag);
    if (session == null) {
      throw InternalServerError();
    }
    setCookie(c, "session", session.id);
    console.log("Set Cookie: " + session.id);
    return session.id;
  }
}

export class AuthMiddleware {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  use(app: Hono, path: string = "*") {
    app.use(path, this.handle());
  }

  handle(): MiddlewareHandler {
    return jwt({
      secret: this.config.jwtPublicKey,
      cookie: { key: "auth" },
      alg: AlgorithmTypes.HS256,
    });
  }
}
