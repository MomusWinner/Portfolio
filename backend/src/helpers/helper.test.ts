import { hashPassword, verifyPassword } from "./helper";
import { describe, it, expect } from "bun:test";

describe("Password hash/verify", () => {
  it("The password should be a different hashed version of the original password.", async () => {
    const pass = "secret";
    const hashPass = await hashPassword(pass);
    expect(pass === hashPass).toBeFalse();
  });
  it("The hashed password must be correctly verified.", async () => {
    const pass = "secret";
    const hashPass = await hashPassword(pass);
    expect(await verifyPassword(pass, hashPass)).toBeTrue();
  });
});
