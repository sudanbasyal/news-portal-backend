import { AppDataSource } from "../../../dataSource";
import { User } from "../../../entity/User";
import { Role } from "../../../entity/Role";
import * as userService from "../../../service/auth";
import * as roleService from "../../../service/role";
import { BadRequestError } from "../../../error/BadRequestError";
import { NotFoundError } from "../../../error/NotFoundError";
import assert from "assert";
import sinon from "sinon";
import * as encrypter from "../../../utils/encrypter";

describe("createUser", function () {
  let roleStub: sinon.SinonStub;
  let hashPasswordStub: sinon.SinonStub;

  before(async function () {
    // Initialize the database connection once for the entire test suite
    await AppDataSource.initialize();
  });

  after(async function () {
    // Clean up the database connection after all tests are done
    await AppDataSource.destroy();
  });

  beforeEach(async function () {
    // Clear the user and role tables before each test
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.query(
      `TRUNCATE "${userRepository.metadata.tableName}" CASCADE`
    );

    const roleRepository = AppDataSource.getRepository(Role);
    await roleRepository.query(
      `TRUNCATE "${roleRepository.metadata.tableName}" CASCADE`
    );

    // Stub necessary dependencies
    roleStub = sinon.stub(roleService, "getRole");
    hashPasswordStub = sinon.stub(encrypter, "hashPassword");
  });

  afterEach(function () {
    // Restore stubs after each test
    roleStub.restore();
    hashPasswordStub.restore();
  });

  it("should create a new user with role and hashed password", async function () {
    // Arrange
    const role = new Role();
    role.id = 1;
    role.name = "user";

    roleStub.resolves(role);
    hashPasswordStub.resolves("hashedpassword123");
    const email = "test@example.com";
    const password = "password123";
    const name = "Test User";
    const roleName = "user";

    // Act
    const newUser = await userService.createUser(
      email,
      password,
      roleName,
      name
    );
    console.log("new user", newUser);

    // Assert
    assert(newUser, "User should be created");
    assert.strictEqual(newUser.email, email);
    assert.strictEqual(newUser.name, name);
    assert.strictEqual(
      newUser.password,
      "hashedpassword123",
      "Password should be hashed"
    );
    assert.strictEqual(
      newUser.roles[0].name,
      role.name,
      "User should be assigned a role"
    );
  });

  it("should throw BadRequestError if email already exists", async function () {
    // Arrange
    const email = "duplicate@example.com";
    const password = "password123";
    const roleName = "user";
    const name = "Test User";

    const role = new Role();
    role.id = 1;
    role.name = "user";

    roleStub.resolves(role);
    hashPasswordStub.resolves("hashedpassword123");

    // Create the first user
    await userService.createUser(email, password, roleName, name);

    // Act and Assert
    await assert.rejects(
      async () => await userService.createUser(email, password, roleName, name),
      BadRequestError,
      "Email already in use"
    );
  });

  it("should throw NotFoundError if role does not exist", async function () {
    // Arrange
    const email = "test@example.com";
    const password = "password123";
    const roleName = "nonexistent_role";
    const name = "Test User";

    roleStub.resolves(null);

    // Act and Assert
    await assert.rejects(
      async () => await userService.createUser(email, password, roleName, name),
      NotFoundError,
      "Role not found"
    );
  });

  describe("getUser", function () {
    let role: Role;

    beforeEach(async function () {
      role = new Role();
      role.name = "user";
      await AppDataSource.getRepository(Role).save(role);
    });

    it("should return null if user not found", async function () {
      const user = await userService.getUser(999);
      assert.strictEqual(user, null, "User should be null");
    });
  });
});
