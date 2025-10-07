import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

const openApiDoc = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio API",
    version: "1.0.0",
    description: "REST API for sessions, aliases, time intervals, and authentication",
  },
  servers: [
    { url: "http://localhost:7080", description: "Local server" },
    { url: "http://areg-kr.com", description: "Production server" },
  ],
  paths: {
    // -------- SESSION --------
    "/api/v1/session": {
      get: {
        summary: "Get all sessions",
        tags: ["Session"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            required: true,
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: {
          "200": { description: "List of sessions" },
        },
      },
      post: {
        summary: "Create session",
        tags: ["Session"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            required: false,
            schema: { type: "string", example: "session={session}" },
          },
        ],
        responses: {
          "201": { description: "Session created" },
        },
      },
    },
    "/api/v1/session/{id}": {
      get: {
        summary: "Get session by ID",
        tags: ["Session"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Session details" } },
      },
      delete: {
        summary: "Delete session",
        tags: ["Session"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Session deleted" } },
      },
    },

    // -------- ALIAS --------
    "/api/v1/alias": {
      get: {
        summary: "Get all aliases",
        tags: ["Alias"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "List of aliases" } },
      },
      post: {
        summary: "Create alias",
        tags: ["Alias"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  tag: { type: "string", example: "Welcome" },
                  alias: { type: "string", example: "MegaCompany" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Alias created" } },
      },
    },
    "/api/v1/alias/{id}": {
      delete: {
        summary: "Delete alias",
        tags: ["Alias"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Alias deleted" } },
      },
    },

    // -------- TIME INTERVAL --------
    "/api/v1/time_interval": {
      get: {
        summary: "Get all time intervals",
        tags: ["Time Interval"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "List of time intervals" } },
      },
    },
    "/api/v1/time_interval/{id}": {
      get: {
        summary: "Get time interval by ID",
        tags: ["Time Interval"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Time interval details" } },
      },
      delete: {
        summary: "Delete time interval",
        tags: ["Time Interval"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Time interval deleted" } },
      },
    },
    "/api/v1/time_interval/session/{sessionId}": {
      get: {
        summary: "Get time intervals by session ID",
        tags: ["Time Interval"],
        parameters: [
          { name: "sessionId", in: "path", required: true, schema: { type: "string" } },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Session time intervals" } },
      },
    },
    "/api/v1/time_interval/session/{sessionId}/{date}": {
      get: {
        summary: "Get time intervals by session ID and date",
        tags: ["Time Interval"],
        parameters: [
          { name: "sessionId", in: "path", required: true, schema: { type: "string" } },
          {
            name: "date",
            in: "path",
            required: true,
            schema: { type: "string", example: "2025-10-01" },
          },
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "auth={token}" },
          },
        ],
        responses: { "200": { description: "Time intervals by session and date" } },
      },
    },

    // -------- AUTH --------
    "/api/v1/auth/register": {
      post: {
        summary: "Register new user",
        tags: ["Auth"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "session={session}" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@mail.com" },
                  password: { type: "string", example: "123" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "User registered" } },
      },
    },
    "/api/v1/auth/signin": {
      post: {
        summary: "Sign in user",
        tags: ["Auth"],
        parameters: [
          {
            name: "Cookie",
            in: "header",
            schema: { type: "string", example: "session={session}" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@mail.com" },
                  password: { type: "string", example: "123" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "User signed in" } },
      },
    },
  },
};

const app = new Hono();

// Serve the OpenAPI document
app.get("/doc", (c) => c.json(openApiDoc));

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", swaggerUI({ url: "doc" }));

app.get("/health", (c) => c.text("OK"));

export default app;
