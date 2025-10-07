import { SessionMiddleware } from "@/middleware/middleware";
import { AnaliticsHandler } from "./handler";
import { Hono } from "hono";

export function addAnalicitcsRoutes(
  analiticsHandler: AnaliticsHandler,
  sessionMiddleware: SessionMiddleware
): Hono {
  const app = new Hono();

  app.get("/ws", sessionMiddleware.handle(), analiticsHandler.getAnaliticsWebSocket());

  return app;
}
