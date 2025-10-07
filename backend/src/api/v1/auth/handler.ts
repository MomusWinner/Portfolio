import { AdminRepository, RepositoryError } from "@/repository/admin";
import {
  hashPassword,
  EmptyParametrError,
  InternalServerError,
  verifyPassword,
} from "@/helpers/helper";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import { Config } from "@/config";
import { AlgorithmTypes } from "hono/utils/jwt/jwa";
import { AppContext } from "@/factory";

export class AuthHandler {
  adminR: AdminRepository;
  config: Config;

  constructor(config: Config, adminRepository: AdminRepository) {
    this.config = config;
    this.adminR = adminRepository;
  }

  registerHandle() {
    return async (c: AppContext) => {
      const body = await c.req.json();
      if (typeof body.email === undefined || body.email === "") {
        throw EmptyParametrError("email");
      }
      if (typeof body.password === undefined || body.password === "") {
        throw EmptyParametrError("password");
      }

      const email = body.email;

      const hashedPassword = await hashPassword(body.password);

      const [admin, err] = await this.adminR.createAdmin(email, hashedPassword);

      if (err == RepositoryError.Conflict) {
        c.status(409);
        return c.text("A user with the same email address has already been registered.");
      }

      if (admin === null) {
        throw InternalServerError();
      }

      const response = { id: admin.id, email: admin.email };
      return c.json(response);
    };
  }

  signinHandle() {
    return async (c: AppContext) => {
      const body = await c.req.json();
      if (!body.email) {
        throw EmptyParametrError("email");
      }
      if (!body.password) {
        throw EmptyParametrError("password");
      }

      const email = body.email;
      const password = body.password;

      const admin = await this.adminR.getAdminByEmail(email);

      if (admin === null) {
        return c.notFound();
      }

      if (!(await verifyPassword(password, admin.password))) {
        return c.notFound();
      }

      var currentTime = Math.floor(Date.now() / 1000);
      var expiredAt = currentTime + this.config.tokenLifeTime;

      const result = await sign(
        {
          user: { email: admin.email, id: admin.id },
          iat: currentTime,
          exp: expiredAt,
        },
        this.config.jwtPrivateKey,
        AlgorithmTypes.HS256
      );

      setCookie(c, "auth", result);

      return c.json({
        token: result,
        expired: expiredAt,
      });
    };
  }

  getAllAdminsHandle() {
    return async (c: AppContext) => {
      const admins = await this.adminR.getAllAdmin();
      return c.json(admins);
    };
  }

  getAdminByIdHandle() {
    return async (c: AppContext) => {
      const id = c.req.param("id");
      const admin = await this.adminR.getAdminByID(id);
      if (admin === null) {
        return c.notFound();
      }

      return c.json(admin);
    };
  }

  deleteAdminHandle() {
    return async (c: AppContext) => {
      const id = c.req.param("id");
      this.adminR.deleteAdmin(id);

      return c.json({ status: "success" });
    };
  }
}
