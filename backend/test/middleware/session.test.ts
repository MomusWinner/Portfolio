import { Hono } from "hono";
import { describe, it, expect } from "bun:test";
import { SessionMiddleware } from "@/middleware/middleware";
import { MockSessionRepository } from "../repository/session_mock";

const app = new Hono();
const sessionRepo = new MockSessionRepository();
const sessionMiddleware = new SessionMiddleware(sessionRepo);

app.get("/", sessionMiddleware.handle(), (c) => c.text("Session created!"));

describe("sessionMiddleware", async () => {
  it("should set session cookie and create session in database", async () => {
    const res = await app.request("/");
    const setCookie = res.headers.get("Set-Cookie");
    expect(setCookie).toContain("session=");

    const sessionId = setCookie?.split(";")[0].split("=")[1];
    expect(sessionId).toBeString();

    if (!sessionId) return;
    const session = await sessionRepo.getSessionByID(sessionId);
    expect(session).toBeTruthy();
  });
});
