import { HTTPException } from "hono/http-exception";
import { Context } from "hono";

// Errors

export function EmptyParametrError(parameter: string): HTTPException {
  return new HTTPException(422, { message: `parameter ${parameter} is empty` });
}

export function InternalServerError(): HTTPException {
  return new HTTPException(500, { message: "Something went wrong" });
}

// JWT

interface AdminJWT {
  ip: string;
  email: string;
}

export function getJwtAdmin(c: Context): AdminJWT {
  const payload = c.get("jwtPayload");

  return {
    ip: payload.user.ip,
    email: payload.user.email,
  };
}

// Password

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await Bun.password.hash(password);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashPassword: string): Promise<boolean> {
  return await Bun.password.verify(password, hashPassword);
}
