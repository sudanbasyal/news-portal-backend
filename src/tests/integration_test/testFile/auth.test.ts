import { AppDataSource } from "../../../dataSource";

import { User } from "../../../entity/User";
import { Role } from "../../../entity/Role";
import { Permission } from "../../../entity/Permission";

import assert from "assert";
import sinon from "sinon";

import * as authService from "../../../service/auth";

import * as encrypter from "../../../utils/encrypter";
import * as jwt from "jsonwebtoken";

import config from "../../../config";

import { BadRequestError } from "../../../error/BadRequestError";

describe("Auth Integration Tests", function () {
  let comparePasswordStub: sinon.SinonStub;
  let testUser: User;
  let userRole: Role;
  let readPermission: Permission;
  let writePermission: Permission;

  before(async function () {
    await AppDataSource.initialize();
  });

  after(async function () {
    await AppDataSource.destroy();
  });

  beforeEach(async function () {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.query(
      `TRUNCATE "${userRepository.metadata.tableName}" CASCADE`,
    );

    const roleRepository = AppDataSource.getRepository(Role);
    await roleRepository.query(
      `TRUNCATE "${roleRepository.metadata.tableName}" CASCADE`,
    );

    const permissionRepository = AppDataSource.getRepository(Permission);
    await permissionRepository.query(
      `TRUNCATE "${permissionRepository.metadata.tableName}" CASCADE`,
    );

    readPermission = new Permission();
    readPermission.name = "read";
    await permissionRepository.save(readPermission);

    writePermission = new Permission();
    writePermission.name = "write";
    await permissionRepository.save(writePermission);

    userRole = new Role();
    userRole.name = "user";
    userRole.permissions = [readPermission, writePermission];
    await roleRepository.save(userRole);

    testUser = new User();
    testUser.email = "test@example.com";
    testUser.password = "hashedpassword123";
    testUser.name = "Test User";
    testUser.roles = [userRole];
    await userRepository.save(testUser);

    comparePasswordStub = sinon.stub(encrypter, "comparePassword");
  });

  afterEach(function () {
    comparePasswordStub.restore();
  });

  it("should successfully login with correct credentials", async function () {
    const loginData = {
      email: "test@example.com",
      password: "correctpassword",
    };
    comparePasswordStub.resolves(true);

    const result = await authService.login(loginData);

    assert(result, "Login result should exist");
    assert(result.accessToken, "Access token should be present");
    assert(result.refreshToken, "Refresh token should be present");

    const decodedToken = jwt.verify(
      result.accessToken,
      config.jwt.secret!,
    ) as any;
    assert.strictEqual(decodedToken.email, loginData.email);
    assert.strictEqual(decodedToken.id, testUser.id);
    assert.deepStrictEqual(decodedToken.role, ["user"]);
    assert.deepStrictEqual(decodedToken.permissions, ["read", "write"]);
  });

  it("should return null for non-existent user", async function () {
    const loginData = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    const result = await authService.login(loginData);

    assert.strictEqual(result, null);
  });

  it("should throw BadRequestError for incorrect password", async function () {
    const loginData = {
      email: "test@example.com",
      password: "wrongpassword",
    };
    comparePasswordStub.resolves(false);

    await assert.rejects(
      async () => await authService.login(loginData),
      BadRequestError,
      "Password doesnt match",
    );
  });

  it("should generate tokens with correct expiration times", async function () {
    const loginData = {
      email: "test@example.com",
      password: "correctpassword",
    };
    comparePasswordStub.resolves(true);

    const result = await authService.login(loginData);
    console.log("result", result);

    const decodedAccessToken = jwt.verify(
      result!.accessToken,
      config.jwt.secret!,
    ) as any;
    const decodedRefreshToken = jwt.verify(
      result!.refreshToken,
      config.jwt.secret!,
    ) as any;

    assert(decodedAccessToken.exp! > Math.floor(Date.now() / 1000));
    assert(decodedRefreshToken.exp! > decodedAccessToken.exp!);
  });

  it("should include all user permissions in token", async function () {
    const loginData = {
      email: "test@example.com",
      password: "correctpassword",
    };
    comparePasswordStub.resolves(true);

    const deletePermission = new Permission();
    deletePermission.name = "delete";
    await AppDataSource.getRepository(Permission).save(deletePermission);

    userRole.permissions.push(deletePermission);
    await AppDataSource.getRepository(Role).save(userRole);

    const result = await authService.login(loginData);

    const decodedToken = jwt.verify(
      result!.accessToken,
      config.jwt.secret!,
    ) as any;
    assert.deepStrictEqual(
      decodedToken.permissions.sort(),
      ["read", "write", "delete"].sort(),
    );
  });

  it("should handle multiple roles and their permissions", async function () {
    const adminPermission = new Permission();
    adminPermission.name = "admin";
    await AppDataSource.getRepository(Permission).save(adminPermission);

    const adminRole = new Role();
    adminRole.name = "admin";
    adminRole.permissions = [adminPermission];
    await AppDataSource.getRepository(Role).save(adminRole);

    testUser.roles.push(adminRole);
    await AppDataSource.getRepository(User).save(testUser);

    const loginData = {
      email: "test@example.com",
      password: "correctpassword",
    };
    comparePasswordStub.resolves(true);

    const result = await authService.login(loginData);

    const decodedToken = jwt.verify(
      result!.accessToken,
      config.jwt.secret!,
    ) as any;
    assert.deepStrictEqual(decodedToken.role.sort(), ["user", "admin"].sort());
    assert.deepStrictEqual(
      decodedToken.permissions.sort(),
      ["read", "write", "admin"].sort(),
    );
  });
});
