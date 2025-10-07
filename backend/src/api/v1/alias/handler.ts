import { Context } from "hono";
import { AnaliticsRepository } from "@/repository/analitics";
import { EmptyParametrError } from "@/helpers/helper";

export class AliasHandler {
  analiticsR: AnaliticsRepository;

  constructor(analiticsR: AnaliticsRepository) {
    this.analiticsR = analiticsR;
  }

  createAlias() {
    return async (c: Context) => {
      const body = await c.req.json();
      if (typeof body.tag === undefined || body.tag === "") {
        throw EmptyParametrError("tag");
      }
      if (typeof body.alias === undefined || body.alias === "") {
        throw EmptyParametrError("alias");
      }

      let tag = body.tag;
      let alias = body.alias;

      let r = await this.analiticsR.createAlias(tag, alias);
      if (r) {
        c.status(201);
      } else {
        return c.status(500);
      }

      return c.json(r);
    };
  }

  getAllAliases() {
    return async (c: Context) => {
      let r = await this.analiticsR.getAllAliases();

      return c.json(r);
    };
  }

  deleteAliasByIDHandle() {
    return async (c: Context) => {
      const id = c.req.param("id");
      await this.analiticsR.deleteAliase(id);

      return c.json({ status: "success" });
    };
  }
}
