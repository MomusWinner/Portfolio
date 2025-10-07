import { AuthHandler } from "./handler";
import { App, createApp } from "@/factory";

export function addAuthRoutes(authHandler: AuthHandler): App {
  const app = createApp();

  app.post("/register", authHandler.registerHandle());
  app.post("/signin", authHandler.signinHandle());

  return app;
}
