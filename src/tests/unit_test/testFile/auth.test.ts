import { login } from "../../../service/auth";
import * as userService from "../../../service/auth";
import { comparePassword } from "../../../utils/encrypter";
import { sign } from "jsonwebtoken";
import * as assert from "assert";
import sinon from "sinon";
import { mockUser } from "../testData/auth.test";

describe("login function", () => {
  let userServiceStub: sinon.SinonStub;
  let comparePasswordStub: sinon.SinonStub;
  let jwtSignStub: sinon.SinonStub;

  beforeEach(() => {
    userServiceStub = sinon.stub(userService, "findByEmail").resolves(mockUser);
    sinon.stub(userService, "getUser").resolves(mockUser);
    comparePasswordStub = sinon.stub().resolves(true);
    jwtSignStub = sinon.stub().returns("token");

    (userService as any).findByEmail = userServiceStub;
    (userService as any).getUser = sinon.stub().resolves(mockUser);
    (comparePassword as any) = comparePasswordStub;
    (sign as any) = jwtSignStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return accessToken and refreshToken when login is successful", async () => {
    const body = { email: "test@example.com", password: "password123" };
    const tokens = await login(body);

    assert.strictEqual(tokens?.accessToken, "token");
    assert.strictEqual(tokens?.refreshToken, "token");

    sinon.assert.calledOnceWithExactly(userServiceStub, "test@example.com");
    sinon.assert.calledOnceWithExactly(
      comparePasswordStub,
      "password123",
      "hashedPassword"
    );
    sinon.assert.calledTwice(jwtSignStub);
  });

  it("should return null if user is not found", async () => {
    userServiceStub.resolves(null);
    const body = { email: "unknown@example.com", password: "password123" };
    const result = await login(body);

    assert.strictEqual(result, null);
    sinon.assert.calledOnceWithExactly(userServiceStub, "unknown@example.com");
  });

  it("should throw BadRequestError if password doesn't match", async () => {
    comparePasswordStub.resolves(false);
    const body = { email: "test@example.com", password: "wrongPassword" };

    await assert.rejects(
      async () => await login(body),
      (err: Error) => {
        assert.strictEqual(err.message, "Password doesnt match");
        return true;
      }
    );
  });

  it("should throw BadRequestError if account does not match", async () => {
    (userService.getUser as sinon.SinonStub).resolves(null);
    const body = { email: "test@example.com", password: "password123" };

    await assert.rejects(
      async () => await login(body),
      (err: Error) => {
        assert.strictEqual(err.message, "Account doesnt match");
        return true;
      }
    );
  });
});
